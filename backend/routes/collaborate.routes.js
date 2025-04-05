import express from  'express';
import { createCollaborationRequest } from '../controllers/colloboration.controller.js';
export const collaborateRoutes = express.Router();
collaborateRoutes.post("/collaborationrequests",createCollaborationRequest)
