import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    content: { type: String, default: "" }, // Store the code content directly
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
export default File;
