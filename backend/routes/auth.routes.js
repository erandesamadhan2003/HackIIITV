import express from 'express'
import { getUserDetails, LoginUser, RegisterUser } from '../controllers/auth.controller.js';

export const authRoutes = express.Router();

authRoutes.post('/signup', RegisterUser );
authRoutes.post('/login', LoginUser);
authRoutes.get('/user/:userId', getUserDetails);