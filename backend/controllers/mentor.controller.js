import mongoose from "mongoose";
import { Mentor } from "../modules/mentor.js";
export const registerMentor = async (req, res) => {
    const { name, email, year, expertise, experience, projects, availability, socials, bio } = req.body;
  
    try {
     
      let existingMentor = await Mentor.findOne({ email });
      if (existingMentor) {
        return res.status(400).json({ message: "Mentor with this email already exists" });
      }
  
      const newMentor = new Mentor({
        name,
        email,
        year,
        expertise,
        experience,
        projects,
        availability,
        socials,
        bio
      });
  
      await newMentor.save();
      res.status(201).json(newMentor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const allMentor = async (req, res) => {
    try {
      const mentors = await Mentor.find();
      
      if (!mentors || mentors.length === 0) {
        return res.status(404).json({ message: "No mentors found" });
      }
  
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  