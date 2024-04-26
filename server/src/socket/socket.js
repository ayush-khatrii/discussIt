import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { getSockets } from "../utils/helper.js";
import Message from "../models/message.model.js";


const app = express();
const server = createServer(app);

// socket initialization
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
        origin: "http://localhost:3000"
    }
});




const usersocketIDs = new Map();

// socket io implementation
io.on("connection", (socket) => {

    const user = {
        _id: "23645",
        fullName: "Ayush Khatri"
    }

    usersocketIDs.set(user._id.toString(), socket.id);
    console.log(usersocketIDs)

    console.log("Connected to socket.io", socket.id);

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



export { app, server, io, usersocketIDs }  