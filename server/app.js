import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuidv4 } from 'uuid';
import cookieParser from "cookie-parser";
import Message from "./src/models/message.model.js";
import { socketAuth } from "./src/middlewares/verifyToken.js";

// Routers
import authRouter from "./src/routes/auth.route.js";
import chatRouter from "./src/routes/chat.route.js";
import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";
// Connection
import connectDB from "./src/db/connectDB.js";
const port = process.env.PORT || 5000;


const app = express();
const server = createServer(app);

// Socket-io Initialization
const getSockets = (users) => {
  const sockets = users?.map((user) => usersocketIDs.get(user?.toString()));
  return sockets;
}
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true
  },
  cookie: true
});


// MiddleWares
app.set("io", io);
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

const usersocketIDs = new Map();
// socket-io auth middleware
io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuth(err, socket, next)
  );
});

// socket-io implementation
io.on("connection", (socket) => {
  const user = socket.user;
  usersocketIDs.set(user._id.toString(), socket.id);

  socket.broadcast.emit("welcome", `Welcome ${socket.id} to the chat`);



  // send  message realtime message from server to client
  socket.on("new-message", async ({ chat, members, content }) => {
    const receivedMessage = {
      content,
      _id: uuidv4(),
      sender: {
        _id: user._id,
        fullName: user.fullName
      },
      chat,
      createdAt: new Date().toISOString()
    }
    console.log("Message received: ", receivedMessage);

    const message = {
      content,
      sender: user._id,
      chat
    }

    const allUserSockets = getSockets(members);
    io.to(allUserSockets).emit("new-message", {
      receivedMessage
    });
    io.to(allUserSockets).emit("new-message-received", { chat });

    try {
      await Message.create(message)
    } catch (error) {
      console.log(error);
    }

  })

  socket.on("disconnect", () => {
    usersocketIDs.delete(user._id.toString());
    console.log("Disconnected from socket.io" + socket.id);
  });
});

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

export { usersocketIDs }