import express from  'express';
import {registerMentee } from '../controllers/mentee.controller.js';
export const menteeRoutes = express.Router();
menteeRoutes.post("/registermentee",registerMentee);
