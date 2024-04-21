import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import authRouter from "./src/routes/auth.route.js";
import chatRouter from "./src/routes/chat.route.js";
import userRouter from "./src/routes/user.route.js";

import connectDB from "./src/db/connectDB.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;

const app = express();

// MiddleWares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket io

// Http requests

app.get("/", (req, res) => {
  res.send("Hello  World!");
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/user", userRouter);

// checking middlewares

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    errorMessage,
    statusCode,
  });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
});
