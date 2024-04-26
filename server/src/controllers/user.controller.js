import User from "../models/user.model.js";
import Request from "../models/requests.model.js";
import { removeExistingFile, uploadFile } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import Chat from "../models/chat.model.js";

// Get user profile
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user)
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

        const { username, fullName, bio } = req.body;
        const { userId } = req.params;

        if (!userId) {
            return next(errorHandler(404, 'User not provided!'));
        }
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }

        const updatedAvatar = {};


        const existingAvatar = {
            public_id: user.avatar.public_id,
            avatar_url: user.avatar.avatar_url
        }
        if (user.avatar?.public_id) {
            const [removedUserAvatar, uploadedUserAvatar] = await Promise.all([
                removeExistingFile(existingAvatar.public_id),
                uploadFile(req.file.path, "user-avatar", "image")
            ]);

            updatedAvatar.avatar = {
                public_id: uploadedUserAvatar.public_id,
                avatar_url: uploadedUserAvatar.url
            }
        } else {
            const uplodedAvatar = await uploadFile(req.file.path, "user-avatar", "image");
            updatedAvatar.avatar = {
                public_id: uplodedAvatar.public_id,
                avatar_url: uplodedAvatar.url
            }
        }
        const newUpdatedUser = await User.findByIdAndUpdate(
            userId, {
            username,
            fullName,
            username,
            bio,
            avatar: updatedAvatar.avatar
        }, { new: true }
        )

        await newUpdatedUser.save();
        res.status(200).json({ message: "Profile updated successfully!", newUpdatedUser });

    } catch (error) {
        next(error);
    }
}
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
        const request = await Request.findOne({
            $or: [
                { sender: userId, receiver: req.user },
                { sender: req.user, receiver: userId }
            ]
        });

        if (request) {
            return next(errorHandler(400, "Request already sent!"));
        }

        const newRequest = new Request({
            sender: req.user,
            receiver: userId
        });

        await newRequest.save();

        res.status(200).json({ success: true, message: "Friend request sent!" });

    } catch (error) {
        next(error);
    }
}
// Accept Friend Request
const acceptFriendRequest = async (req, res, next) => {
    try {
        const { requestId, accept } = req.body;

        const request = await Request.findById(requestId)
            .populate("sender", "fullName")
            .populate("receiver", "fullName");

        if (!request) {
            return next(errorHandler(404, "Request not found!"));
        }

        if (request.receiver._id.toString() !== req.user.toString()) {
            return next(errorHandler(400, "You are not allowed to accept this request!"));
        }

        if (!accept) {
            await request.deleteOne();
            return res.status(200).json({ success: true, message: "Friend request rejected!" });
        }

        const members = [request.sender._id, request.receiver._id];

        await Promise.all([
            Chat.create({
                members,
                name: request.sender.fullName
            }),
            request.deleteOne(),
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
            { receiver: req.user }
        ).populate("sender", "fullName avatar");

        if (!allRequests || allRequests.length === 0) {
            return next(errorHandler(404, "No pending friend requests found!"));
        }



        const friendRequests = allRequests.map(({ _id, sender, fullName, avatar }) => ({
            _id,
            sender: {
                _id: sender._id,
                fullName: sender.fullName,
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
export default {
    getProfile,
    updateProfile,
    deleteProfile,
    sendFriendRequest,
    acceptFriendRequest,
    getAllFriendRequests
}