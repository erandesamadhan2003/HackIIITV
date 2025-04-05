
import mongoose from "mongoose";
const CollaborationRequestSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    menteeId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentee", required: true },
    projectTitle: { type: String, required: true },
    description: String,
    requiredSkills: [String],
    duration: String, // e.g., "2 weeks", "1 month"
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending"
    },
    responseMessage: String,
  }, { timestamps: true });
  

  export const CollaborationRequest=mongoose.model("CollaborationRequest", CollaborationRequestSchema);