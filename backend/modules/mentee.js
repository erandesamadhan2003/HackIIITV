import mongoose from "mongoose";

const MenteeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // college: String,
    year: String,
    goals: String, 
    skills: [String], 
    interests: [String], 
    expectations: String, 
  }, { timestamps: true });
  

export const Mentee= mongoose.model("Mentee", MenteeSchema);