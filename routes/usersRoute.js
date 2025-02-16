import {createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getUserByPhoneController} from '../controllers/usersController.js';
import express from 'express';

const router = express.Router();

// Define routes
router.post('/', createUserController);
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;