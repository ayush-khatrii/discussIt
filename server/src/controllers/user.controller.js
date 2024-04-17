import User from "../models/user.model.js";
import { removeExistingFile, uploadFile } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";

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
        const user = await User.findById(userId).select("-password ");

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


export default {
    getProfile,
    updateProfile,
    deleteProfile
}