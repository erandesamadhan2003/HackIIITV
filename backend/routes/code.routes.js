import express from 'express'
import { executeCode } from '../controllers/code.controller.js';

export const codeRoutes = express.Router();

codeRoutes.post('/execute', executeCode);