import express from 'express';
import { createUser, getUserById, deleteUser } from '../controllers/userCreationController.js';

const router = express.Router();

router.post('/signup', createUser); 
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);


export default router;
