import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
//   college: String,
  year: String,
  expertise: [String],
  experience: String, 
  projects: [String], 
  availability: {
    days: [String], 
    time: String, 
  },
  socials: {
    github: String,
    linkedin: String,
  },
//   rating: { type: Number, default: 0 },
//   totalReviews: { type: Number, default: 0 },
  bio: String,
}, { timestamps: true });


export const Mentor=mongoose.model("Mentor",MentorSchema);