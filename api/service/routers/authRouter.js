import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Define routes for signup, login, and logout
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
