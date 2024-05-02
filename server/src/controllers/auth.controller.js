import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import errorHandler from "../utils/errorHandler.js";

// SignUp Controller
const handleSignUp = async (req, res, next) => {
  try {
    const { fullName, password, username, gender } = req.body;

    // Validation
    if (!password || !username || !fullName || !gender) {
      return next(errorHandler(404, "Please provide required fields!"));
    }

    // Check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(404).json({ message: "User already exists!" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default avatar URL based on gender
    const defaultAvatarUrl =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const avatar = {
      public_id: "",
      avatar_url: defaultAvatarUrl
    }

    // Create new user with default avatar
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      avatar
    });

    await newUser.save();

    // Generate token for the new user
    generateToken(newUser._id, res);

    // Send response with user information
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      avatar_url: defaultAvatarUrl // Include default avatar URL in the response
    });
  } catch (error) {
    console.error("ERROR FROM REGISTER CONTROLLER:", error.message);
    next(error);
  }
};


// Login Controller
const handleSignIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(errorHandler(404, "Please provide required fields!"));
    }

    const foundUser = await User.findOne({ username });
    if (!foundUser) return next(errorHandler(404, "User not found!"));

    // compare password
    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword || !foundUser) {
      return next(errorHandler(401, "Invalid username or password!"));
    }


    generateToken(foundUser._id, res);

    // extract avatar object from the response and save it in avatar variable
    const avatar = foundUser.avatar?.avatar_url;

    res.status(200).json({
      _id: foundUser._id,
      fullName: foundUser.fullName,
      username: foundUser.username,
      avatar
    });
  } catch (error) {
    console.error("login  controller ERROR : ", error.message);
    next(error);
  }
};

// Logout Controller
const handleLogout = (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};


export default {
  handleSignUp,
  handleSignIn,
  handleLogout,
};
