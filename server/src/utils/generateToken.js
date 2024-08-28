import jwt from "jsonwebtoken";


const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });


  // setting cookie
  res.cookie("token", token, cookieOptions);
};
export const verifyToken = (user, token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
