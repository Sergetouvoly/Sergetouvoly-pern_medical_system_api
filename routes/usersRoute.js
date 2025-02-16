import {createUser, getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/usersController.js';
import express from 'express';

const router = express.Router();

// Define routes
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;