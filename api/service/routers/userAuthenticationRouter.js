import express from 'express';
import { loginUser, verifyEmail, deleteUser, sendPasswordResetEmail, resetPassword } from '../controllers/userAuthenticationController.js';

const router = express.Router();


router.post('/login', loginUser);
router.get('/verify/:token', verifyEmail);
router.delete('/delete/:id', deleteUser); // Added id in the route to delete a user
router.post('/resetPassword', sendPasswordResetEmail); // Post request to send reset email
router.put('/resetPassword/:token', resetPassword); // Put request for the password reset

export default router;
