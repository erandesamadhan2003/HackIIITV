import mongoose from "mongoose";
import { Mentee } from "../modules/mentee.js";
export const registerMentee = async (req, res) => {
    const { name, email, year, goals, skills, interests, expectations } = req.body;
  
    try {
      let existingMentee = await Mentee.findOne({ email });
      if (existingMentee) {
        return res.status(400).json({ message: "Mentee with this email already exists" });
      }
  
      const newMentee = new Mentee({
        name,
        email,
        year,
        goals,
        skills,
        interests,
        expectations
      });
  
      await newMentee.save();
      res.status(201).json({ message: "Mentee registered successfully" }); // 🔒 No private data sent back
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };