import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
    return next(errorHandler(401, "No token or authorization header found!"));

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(errorHandler(401, "Please login first!"));


    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (!decoded) {
        return next(errorHandler(401, "Token expired, please login again!"));
      }
      const decodedData = await User.findById(decoded.userId).select("-password");

      if (!decodedData) {
        return next(errorHandler(401, "User not found!"));
      }
      console.log("Decoded data ki id ", decodedData._id);

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
export default verifyToken;
