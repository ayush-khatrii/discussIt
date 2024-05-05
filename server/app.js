import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./src/socket/socket.js"
import cors from "cors";
import express from "express";

// Routers
import authRouter from "./src/routes/auth.route.js";
import chatRouter from "./src/routes/chat.route.js";
import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";

import connectDB from "./src/db/connectDB.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

// MiddleWares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

// Http requests

app.get("/", (req, res) => {
  res.send("Hello  World!");
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/user", userRouter);
app.use("/admin", adminRouter);


// checking middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
});
