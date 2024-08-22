import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import { uploadFile, removeExistingFile } from "../utils/cloudinary.js";
import { getOtherMember } from "../utils/helper.js";
import Message from "../models/message.model.js";


// Create group chat
const createGroupChat = async (req, res, next) => {
	try {
		const { name, members } = req.body;
		const groupAdmin = req.user._id;

		if (!name || !members) {
			return next(errorHandler(400, "Please provide required fields"));
		}

		if (members.length > 10) {
			return next(errorHandler(400, "You can not select more than 10 members"));
		}

		if (members.length < 2) {
			return next(errorHandler(400, "Please add atleast 3 members"));
		}

		const existingMembers = await User.find({ _id: { $in: members } });

		if (existingMembers.length !== members.length) {
			return next(errorHandler(400, "Members do not exist!"));
		}

		if (members.includes(groupAdmin)) {
			return next(errorHandler(400, "You cannot add yourself as a member!"));
		}

		// also add yourself to the group chat
		const allNewMembers = [...members, groupAdmin];

		const newChat = await Chat.create({
			name,
			members: allNewMembers,
			isGroupChat: allNewMembers.length > 2 ? true : false,
			groupAdmin,
		});

		await newChat.save();
		res.status(200).json(newChat);
	} catch (error) {
		next(error);
	}
};

// update group chat
const updateGroupChat = async (req, res, next) => {
	try {
		const { name } = req.body;
		const { chatId } = req.params;

		const foundChat = await Chat.findById(chatId);

		if (!foundChat) {
			return next(errorHandler(404, "Chat not found!"));
		}
		if (!foundChat.isGroupChat) {
			return next(errorHandler(400, "Not a group chat!"));
		}

		const updatedData = {};

		const avatarPublicId = {
			public_id: foundChat.groupAvatar.public_id,
			avatar_url: foundChat.groupAvatar.avatar_url
		}
		console.log("The existing avatar's public id is :  ", avatarPublicId);

		if (foundChat.groupAvatar?.public_id) {
			// if user have public_id, remove it and upload a new one
			const [removedFile, uploadedFile] = await Promise.all([ // using promis.all two perform
				removeExistingFile(avatarPublicId.public_id), // remove existing based on public id
				uploadFile(req.file.path, "group-avatar", "image") // upload the new file
			]);

			updatedData.groupAvatar = {
				public_id: uploadedFile.public_id,
				avatar_url: uploadedFile.url
			}

		} else {
			// if user doesn't have public_id, upload a new one
			const uploadedFile = await uploadFile(req.file.path, "group-avatar", "image");
			updatedData.groupAvatar = {
				public_id: uploadedFile.public_id,
				avatar_url: uploadedFile.url
			}
		}
		// Update name if provided
		if (name) {
			updatedData.name = name;
		}


		const updatedChat = await Chat.findByIdAndUpdate(chatId, updatedData, { new: true });
		res.status(200).json({ success: true, message: "Group chat updated successfully", updatedChat });

	} catch (error) {
		next(error);
	}
};

// delete group chat
const deleteGroupChat = async (req, res, next) => {
	try {
		const { chatId } = req.params;

		const foundChats = await Chat.findById(chatId);

		if (!foundChats) {
			return next(errorHandler(404, "Chat not found!"))
		}

		await Chat.findByIdAndDelete(chatId);

		res.status(200).json({ message: "Chat deleted successfully" });
	} catch (error) {
		next(error);
	}
};

// Get my chats
const getMyChats = async (req, res, next) => {
	try {
		const myChats = await Chat.find({ members: req.user })
			.populate("members", "fullName avatar").select("-password");

		if (!myChats || myChats.length === 0) {
			return next(errorHandler(404, "No chats found!"));
		}
		// only returning response of groupAvatar , chat id , members list with id excluding the current user and fullName , isgroupChat 
		const transformedChats = myChats.map(chat => {
			const otherMember = getOtherMember(chat.members, req.user);
			return {
				groupAdmin: chat.groupAdmin,
				name: chat.isGroupChat ? chat.name : otherMember?.fullName,
				avatar: chat.isGroupChat ? chat?.groupAvatar?.avatar_url : otherMember?.avatar?.avatar_url,
				_id: chat._id,
				members: chat.members.filter(item => item._id.toString() !== req.user._id.toString()),
				isGroupChat: chat.isGroupChat
			}
		});

		res.json({
			success: true,
			transformedChats
		})

	} catch (error) {
		next(error);
	}
};

// Add members  to group chat
const addGroupMembers = async (req, res, next) => {
	try {
		const { members } = req.body;
		const { chatId } = req.params;

		if (!members || members.length < 1) {
			return next(errorHandler(404, "Please enter members!"));
		}
		const existingChat = await Chat.findById(chatId);

		if (existingChat.groupAdmin.toString() !== req.user.toString()) {
			return next(errorHandler(403, "Only group admins can add members!"));
		}

		if (!existingChat) {
			return next(errorHandler(404, "Chat not found!"));
		}

		if (!existingChat.isGroupChat) {
			return next(errorHandler(400, "Cannot add members to a non-group chat!"));
		}

		if (existingChat.members.length > 50) {
			return next(errorHandler(400, "Cannot add more than 50 members to a group chat!"));
		}
		// const updatedChat = await Chat.findByIdAndUpdate(chatId, { $push: { members: members } }, { new: true });

		const membersPromise = members.map(member => User.findById(member).select("fullName"));

		const allMembers = await Promise.all(membersPromise);

		existingChat.members.push(...allMembers.map(member => member._id));

		existingChat.save()

		res.status(200).json({ success: true, message: "Members added successfully" });

	} catch (error) {
		next(error)
	}
};

// Remove members from group chat 
const removeGroupMembers = async (req, res, next) => {
	try {
		const { userId } = req.body;
		const { chatId } = req.params;

		const foundUser = await User.findById(userId);

		if (!foundUser) {
			return next(errorHandler(404, "User not found!"));
		}
		const existingChat = Chat.findById(chatId);

		if (!existingChat) {
			return next(errorHandler(404, "Chat not found!"));
		}

		if (!existingChat.isGroupChat) {
			return next(errorHandler(400, "Cannot remove members from a non-group chat!"));
		}
		if (!foundUser.groupAdmin.toString() === req.user.toString()) {
			return next(errorHandler(400, "Only group admins can remove members!"));
		}

		// remove members from a group 
		const updatedChat = await Chat.findByIdAndUpdate(chatId, { $pull: { members: userId } }, { new: true });

		res.status(200).json({ success: true, message: `${userId} Member removed successfully`, updatedChat });

	} catch (error) {
		next(error)
	}
};

// Leave from the group

const leaveGroup = async (req, res, next) => {
	try {
		const { chatId } = req.params;
		const foundChat = await Chat.findById(chatId);

		if (!foundChat) {
			return next(errorHandler(404, "Group not found!"));
		}
		if (!foundChat.isGroupChat) {
			return next(errorHandler(404, "You cannot leave from a non-group chat! "))
		}

		// founding the existing members from the group chat
		const existingGroupMembers = foundChat.members.filter((member) => member.toString() !== req.user.toString());

		if (foundChat.groupAdmin.toString() === req.user.toString()) {
			foundChat.groupAdmin = existingGroupMembers[0];
		}

		foundChat.members = existingGroupMembers;
		await foundChat.save();
		res.status(200).json({ message: "Group left successfully" });
	} catch (error) {
		next(error)
	}
};

const getChatDetails = async (req, res, next) => {
	try {

		const { chatId } = req.params;
		if (req.query.populate === "true") {
			const foundChat = await Chat.findById(chatId)
				.populate({
					path: "members",
					select: "fullName avatar",
				});
			const otherMember = getOtherMember(foundChat.members, req.user);
			const chatdata = {
				chatId: foundChat._id,
				name: otherMember.fullName,
				chatAvatar: otherMember?.avatar?.avatar_url,
				members: foundChat.members.map(item => item._id.toString()),
				otherMemberId: otherMember?._id,
			}
			if (!foundChat) {
				return next(errorHandler(404, "Chat not found!"));
			}
			res.status(200).json({ success: true, chatdata });
		}
		else {
			const foundChat = await Chat.findById(chatId);
			if (!foundChat) {
				return next(errorHandler(404, "Chat not found!"));
			}
			const chatDetails = {
				chatId: foundChat._id,
				name: foundChat.name,
				members: foundChat.members.map(item => item._id.toString()),
				otherMemberId: otherMember?._id,
			}
			res.status(200).json({ success: true, chatDetails });
		}
	} catch (error) {
		next(error);
	}
}

const createOneToOneChat = async (req, res, next) => {
	try {
		const { recipientId, content } = req.body;
		const senderId = req.user._id;

		if (!recipientId || !content) {
			return next(errorHandler(400, "Please provide required fields"));
		}

		const recipient = await User.findById(recipientId);
		if (!recipient) {
			return next(errorHandler(404, "Recipient not found"));
		}

		// Check if a chat already exists between the users
		let chat = await Chat.findOne({
			isGroupChat: false,
			members: { $all: [senderId, recipientId] }
		});

		if (!chat) {
			chat = new Chat({
				members: [senderId, recipientId],
				isGroupChat: false
			});
			await chat.save();
		}

		const newMessage = new Message({
			sender: senderId,
			content,
			chat: chat._id
		});
		await newMessage.save();

		await chat.save();

		res.status(201).json({ success: true, chat });
	} catch (error) {
		next(error);
	}
};

const getMessages = async (req, res, next) => {
	try {
		const { chatId } = req.params;
		const { page } = req.query;
		const resultPerPage = 10;
		const skip = (page - 1) * resultPerPage;

		const chat = await Chat.findById(chatId);
		if (!chat) {
			return next(errorHandler(404, "Chat not found!"));
		}
		if (!chat.members.includes(req.user.toString())) {
			return next(errorHandler(401, "You are not authorized to access this chat!"));
		}
		const [messages, totalMessages] = await Promise.all([
			Message.find({ chat: chatId })
				.populate("sender", "username")
				.sort({ createdAt: -1 })
				.limit(resultPerPage)
				.skip(skip)
				.lean(),
			Message.countDocuments({ chat: chatId }),
		]);
		const totalPages = Math.ceil(totalMessages / resultPerPage) || 0;

		res.status(200).json({
			success: true,
			messages,
			totalPages,
			totalMessages
		});
	} catch (error) {
		next(error);
	}
}
const deleteMessage = async (req, res, next) => {
	try {
		const { messageId } = req.params;
		const deletedMessage = await Message.findByIdAndDelete(messageId);
		if (!deletedMessage) {
			return next(errorHandler(404, "Message not found!"));
		}

		res.status(200).json({ success: true, message: "Message deleted successfully" });
	} catch (error) {
		next(error);
	}

}
export default {
	createGroupChat,
	updateGroupChat,
	deleteGroupChat,
	addGroupMembers,
	removeGroupMembers,
	getMyChats,
	getChatDetails,
	leaveGroup,
	createOneToOneChat,
	getMessages,
	deleteMessage
};
