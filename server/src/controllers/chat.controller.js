import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import { uploadFile, removeExistingFile } from "../utils/cloudinary.js";


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

    console.log(updatedData)

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
  } catch (error) { }
};

const getMyChats = async (req, res, next) => {
  try {
    // const myChats = await Chat.find({ members: req.user._id })
    //   .populate("members", "fullName  avatar");

    // if (!myChats) returnnext(errorHandler(404, "No chats found!");


    // res.json({
    //   success: true,
    //   chats
    // })

  } catch (error) {
    next(error);
  }
};
const addGroupMembers = async () => { };
const removeGroupMembers = async () => { };

export default {
  createGroupChat,
  updateGroupChat,
  deleteGroupChat,
  addGroupMembers,
  removeGroupMembers,
  getMyChats,
};
