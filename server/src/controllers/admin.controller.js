import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";


const adminLogin = async (req, res, next) => {
    try {
        const { secretKey } = req.body;
        if (!secretKey) {
            return next(errorHandler(401, "Please provide secret key!"));
        }
        const adminKey = process.env.ADMIN_SECRET_KEY || "@yushkhatri";

        const isCorrect = secretKey === adminKey;

        if (!isCorrect) {
            return next(errorHandler(401, "Invalid admin secret key!"));
        }

        const token = jwt.sign(secretKey, process.env.JWT_SECRET);

        return res.status(200).cookie("admin-token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 15,
            secure: process.env.NODE_ENV !== "development",
        }).json({
            success: true,
            message: "Login successfull!"
        });
    } catch (error) {

    }
}
const adminLogout = async (req, res, next) => {
    try {
        res.cookie("admin-token", "", { maxAge: 0 });
        res.status(200).json({ message: "Admin Logged out successfully" });
    } catch (error) {
        next(error);
    }
}

export default {
    adminLogin,
    adminLogout,
}