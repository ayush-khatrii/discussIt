import User from "../models/user.model.js";
import Request from "../models/requests.model.js";
import { removeExistingFile, uploadFile } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import Chat from "../models/chat.model.js";
import fs from "fs";
import path from "path";

// Get current user profile
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user)
            .select("-password -avatar.public_id");
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }
        const userChat = await Chat.find({ members: req.user, isGroupChat: false });
        const totalFriends = userChat.length;
        const userData = {
            _id: user._id,
            totalFriends,
            fullName: user.fullName,
            username: user.username,
            bio: user.bio,
            avatar: user.avatar.avatar_url
        }

        return res.status(200).json(userData);
    } catch (error) {
        next(error)
    }
}
// Get user profile
const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
            .select("-password -avatar.public_id")
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}
// Update user profile
const updateProfile = async (req, res, next) => {
    try {
        // Checking the directory exists before trying to save the file
        const tempDir = path.join(__dirname, 'public/temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });// Create directory if it doesn't exist
        }

        const { username, fullName, bio } = req.body;
        const { userId } = req.params;

        // Check if userId is provided
        if (!userId) {
            return next(errorHandler(404, 'User not provided!'));
        }

        // Find the user by ID
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }

        // Create an object for storing the fields to be updated
        const updates = {};

        // Update fields only if they are provided in the request body
        if (username) updates.username = username;
        if (fullName) updates.fullName = fullName;
        if (bio) updates.bio = bio;

        // Handle avatar update only if a new file is provided
        if (req.file) {
            const existingAvatar = {
                public_id: user.avatar?.public_id,
                avatar_url: user.avatar?.avatar_url
            };

            if (existingAvatar.public_id) {
                const [removedUserAvatar, uploadedUserAvatar] = await Promise.all([
                    removeExistingFile(existingAvatar.public_id),
                    uploadFile(req.file.path, "user-avatar", "image")
                ]);

                updates.avatar = {
                    public_id: uploadedUserAvatar.public_id,
                    avatar_url: uploadedUserAvatar.url
                };
            } else {
                const uploadedAvatar = await uploadFile(req.file.path, "user-avatar", "image");
                updates.avatar = {
                    public_id: uploadedAvatar.public_id,
                    avatar_url: uploadedAvatar.url
                };
            }
        }

        // Update the user with the provided fields
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        console.log(updatedUser);
        await updatedUser.save();

        res.status(200).json({ message: "Profile updated successfully!", updatedUser });
    } catch (error) {
        next(error);
    }
};

// Delete  user profile
const deleteProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { confirmPassword } = req.body;
        if (!confirmPassword) {
            return next(errorHandler(400, 'Please confirm your password to delete your account!'));
        }


        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        const password = await bcrypt.compare(confirmPassword, foundUser.password);
        if (!password) {
            console.log("Incorrect password");
            return next(errorHandler(401, 'Password is  incorrect!'));
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Profile deleted successfully!" });

    } catch (error) {
        next(error);
    }
}
// Send Friend Request
const sendFriendRequest = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const sender = req.user;

        const foundChat = await Chat.findOne({
            isGroupChat: false,
            members: { $all: [sender, userId] }
        });
        if (foundChat) {
            return res.status(400).json({ success: false, requestStatus: "accepted", message: "You are already friends!" });
        }
        const existingRequest = await Request.findOne({
            sender,
            receiver: userId,
        });
        let requestStatus = existingRequest?.status;

        if (existingRequest) {
            if (existingRequest.status === "pending") {
                return res.status(400).json({ success: false, requestStatus, message: "Request already sent!" });
            } else if (existingRequest.status === "accepted") {
                return res.status(400).json({ success: false, requestStatus, message: "You both are already friends!" });
            }
        } 5
        // Checking if a chat already exists between the sender and the receiver

        const newRequest = new Request({
            sender,
            receiver: userId
        });
        await newRequest.save();
        res.status(200).json({ success: true, requestStatus, message: "Friend request sent!" });
    } catch (error) {
        next(error);
    }
}
// Accept Friend Request
const acceptFriendRequest = async (req, res, next) => {
    try {
        const { requestId, accept } = req.body;

        const request = await Request.findById(requestId)
            .populate("sender", "fullName username")
            .populate("receiver", "fullName username");

        // if alreardy accepted
        if (request.status === "accepted") {
            return next(errorHandler(200, "Friend request already accepted!"));
        }
        if (!request) {
            return next(errorHandler(404, "Request not found!"));
        }
        // only you can accept request
        if (request.receiver._id.toString() !== req.user.toString()) {
            return next(errorHandler(400, "You are not allowed to accept this request!"));
        }
        // if request rejected
        if (!accept) {
            await request.deleteOne();
            return res.status(200).json({ success: true, message: "Friend request rejected!" });
        }

        const members = [request.sender._id, request.receiver._id];
        // Checking if chat already exists
        const existingChat = await Chat.findOne({
            members: { $all: members }
        });

        if (existingChat) {
            return next(errorHandler(400, "You are already friends!"));
        }
        await Promise.all([
            request.updateOne({ status: "accepted" }),
            Chat.create({
                members,
                isGroupChat: false,
                name: request.sender.fullName
            }),
            // request.deleteOne(),
        ]);

        // Socket implementation           



        res.status(200).json({
            success: true,
            message: "Friend request accepted!",
            senderId: request.sender._id
        });

    } catch (error) {
        next(error);
    }
}
// Get all friend requests
const getAllFriendRequests = async (req, res, next) => {
    try {

        const allRequests = await Request.find(
            {
                status: "pending",
                receiver: req.user
            }
        ).populate("sender", "fullName username avatar");
        const pendingRequests = allRequests.filter(request => request.status === "pending");

        if (!pendingRequests || pendingRequests.length === 0) {
            return res.status(200).json({ message: "No pending friend requests found!" });
        }
        if (allRequests.status === "pending") {
            return res.status(200).json({ message: "No pending friend requests found!" });
        }
        // const senderIds = pendingRequests.map(request => request.sender._id);
        // const exixstingChats = await Chat.find({
        //     members: { $all: [req.user._id, { $in: senderIds }] }
        // });
        // filter the sender id

        // const request = await Request.findById(requestId)
        //     .populate("sender", "fullName username")
        //     .populate("receiver", "fullName username");

        // const members = [request.sender._id, request.receiver._id];
        // // Checking if chat already exists
        // const existingChat = await Chat.find({
        //     members: { $all: members }
        // });

        // if (existingChat) {
        //     return next(errorHandler(400, "You are already friends!"));
        // }

        const friendRequests = pendingRequests.map(({ _id, sender }) => ({
            _id,
            sender: {
                _id: sender._id,
                fullName: sender.fullName,
                username: sender.username,
                avatar: sender.avatar.avatar_url
            }
        }));

        res.status(200).json({
            success: true,
            friendRequests
        });

    } catch (error) {
        next(error);
    }
}
// Search User
const searchUser = async (req, res, next) => {
    try {
        // search user from db
        const { name } = req.query;
        const foundUser = await User.find({
            $or: [
                { username: { $regex: name, $options: "i" } },
                { fullName: { $regex: name, $options: "i" } },
            ],
        }).select("username fullName avatar.avatar_url");

        // return all user except the current user
        const filteredUsers = foundUser.filter(user => user._id.toString() !== req.user.toString());
        if (!foundUser || foundUser.length === 0) {
            return next(errorHandler(404, "User not found!"));
        }
        // Check the request status for each user
        const userWithRequestStatus = await Promise.all(
            filteredUsers.map(async (user) => {
                const request = await Request.findOne({
                    $or: [
                        { sender: req.user, receiver: user._id },
                        { sender: user._id, receiver: req.user }
                    ]
                });
                return {
                    _id: user._id,
                    username: user.username,
                    fullName: user.fullName,
                    avatar: user.avatar.avatar_url,
                    requestStatus: request?.status || "unknown"
                };
            })

        );

        res.status(200).json({ success: true, userWithRequestStatus });
    } catch (error) {
        next(error);
    }
}
export default {
    getUserProfile,
    getProfile,
    updateProfile,
    deleteProfile,
    sendFriendRequest,
    acceptFriendRequest,
    getAllFriendRequests,
    searchUser
}