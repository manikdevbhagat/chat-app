import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import Message from "./models/messageModel.js";
import connectDB from "./db.js";
import saveMessage from "./services/saveMessage.js";
import getMessages from "./services/getMessages.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let allUsers = [];
let chatRoomUsres = [];

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  //Add a user to a room
  socket.on("join_room", (data) => {
    console.log(data);
    const { username, room } = data;
    allUsers.push({ id: socket.id, username, room });
    socket.join(room);

    let __createdTime__ = Date.now();

    //Send a message to all users currently in the room
    socket.to(room).emit("receive_message", {
      message: `${username} has choined the chat room`,
      username: CHAT_BOT,
      __createdTime__,
    });

    //Send welcome message to the user that just joined
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdTime__,
    });

    //Send an array of all users in the room
    chatRoomUsres = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsres);
    socket.emit("chatroom_users", chatRoomUsres);

    //get message history
    getMessages(room).then((messages)=>{
      socket.emit("last_50_messages", messages);
    });
  });

  socket.on("send_message", (data) => {
    const { message, username, room, __createdtime__ } = data;
    console.log(data);
    io.in(room).emit("receive_message", data);
    saveMessage(data);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
