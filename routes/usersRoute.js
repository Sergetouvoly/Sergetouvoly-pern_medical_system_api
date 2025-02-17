import {createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getUserByPhoneController} from '../controllers/usersController.js';
import express from 'express';

const router = express.Router();

// Define routes
router.post('/users', createUserController);
router.get('/users', getAllUsersController);
router.get('/users/:id', getUserByIdController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;