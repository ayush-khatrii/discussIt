import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {

  try {
    const token = req.cookies.token;
    if (!token) {
      return next(errorHandler(401, "You are not logged in!"))
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (!decoded) {
        return next(errorHandler(401, "Token expired, please login again!"));
      }
      const decodedData = await User.findById(decoded.userId).select("-password");

      if (!decodedData) {
        return next(errorHandler(401, "User not found!"));
      }

      if (err) {
        return res.status(401).json({ message: err.message })
      }


      req.user = decodedData._id;
      next();
    });

  } catch (error) {
    console.log("Error in verify token: ", error.message);
    next(error);
  }
};

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies["admin-token"];
  if (!token) { return next(errorHandler(401, "Please login first!")); }

  try {
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
    const isMatched = secretKey === process.env.ADMIN_SECRET_KEY;

    if (!isMatched) {
      return next(errorHandler(401, "Only Admins are allowed!"));
    }
    next();
  } catch (error) {
    console.log("Error in verify token: ", error.message);
    next(error);
  }
};

export const socketAuth = async (err, socket, next) => {
  try {
    if (err) {
      return next(err)
    }
    const authToken = socket.request.cookies['token'];
    if (!authToken) {
      return next(errorHandler(401, "Please login  first!"));
    }
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.userId).select("-password");
    if (!foundUser) {
      return next(errorHandler(401, "User not found!"));
    }
    socket.user = foundUser;

    return next();
  } catch (error) {
    return next(error);
  }
}