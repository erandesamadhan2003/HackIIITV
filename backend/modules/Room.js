import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    room_id: { type: String, required: true, unique: true },
    room_name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of User references
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }], // Reference to File Schema
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;
