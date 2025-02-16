import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    getUserByPhoneService,
} from '../services/usersServices.js';
import { createUserSchema } from '../validators/usersValidators.js';

export const createUserController = async (req, res) => {
    try {
        const validatedData = await createUserSchema.validate(req.body);
        const { last_name, first_name, phone } = validatedData;

        // Check if user with the same phone already exists
        const existingUser = await getUserByPhoneService(phone);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User's phone already exists. Try a new one." });
        }

        // Create new user
        const user = await createUserService(last_name, first_name, phone);
        console.log("user",user);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred." });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsersService();
        console.log("user",users);
        if (users.length === 0) {
            return res.status(404).json({ error: "Users not found!" });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        console.log("user",user);
        res.status(200).json(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
        }

        const { last_name, first_name, phone } = req.body;
        const { id } = req.params;
        const user = await updateUserService(id, last_name, first_name, phone);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUserService(id);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getUserByPhoneController = async (req, res) => {
    try {
        const { phone } = req.params;
        const user = await getUserByPhoneService(phone);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};