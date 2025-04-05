import express from "express";
import { createRoom, getRoomDetails, getRooms, joinRoom, updateFile } from "../controllers/room.controller.js";
import { FileUpload, getFiles, getspecificFile } from "../controllers/file.controller.js";

export const roomRoutes = express.Router();

roomRoutes.post("/", createRoom);
roomRoutes.get("/get/:roomId", getRoomDetails);
roomRoutes.post('/join/:roomId', joinRoom);
roomRoutes.post('/file/upload',FileUpload);
roomRoutes.get('/file/get/:roomId', getFiles);
roomRoutes.get('/file/specificFile/:fileId', getspecificFile);
roomRoutes.get('/getrooms/:userId', getRooms);
roomRoutes.put("/file/update/:fileId", updateFile)
