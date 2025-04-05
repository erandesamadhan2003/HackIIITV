import { Server } from "socket.io";
import { Message } from "../modules/Message.js"; // Import Message model


export const initSocket = (server) => { 
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("joinRoom", async (roomId) => {
            socket.join(roomId); // Join the specific room
            console.log(`User ${socket.id} joined room ${roomId}`);

            // Fetch and send previous messages when a user joins
            const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
            socket.emit("previousMessages", messages);
        });

        socket.on("send_message", async (data) => {
            const { roomId, username, message } = data;
            
            // Store message in database
            const newMessage = new Message({ roomId, username, message });
            await newMessage.save();

            // Emit message to all users in the room
            io.to(roomId).emit("receivedmessage", newMessage);
        });

        socket.on("codeUpdate", (data) => {
            io.to(data.roomId).emit("changeCode", data.newCode, data.activeFile); // Emit to specific room
        });
    });
};
