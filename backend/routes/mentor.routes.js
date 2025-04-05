import express from  'express';
import { allMentor, registerMentor } from '../controllers/mentor.controller.js';
export const mentorRoutes = express.Router();
mentorRoutes.post("/registermentors",registerMentor);
mentorRoutes.get("/getallmentors",allMentor)