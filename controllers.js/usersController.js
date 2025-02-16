import { usersServices } from '../services/index.js';
import { createUserSchema } from '../validators/usersValidators.js';

export const createUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
        }

        const { last_name, first_name, phone } = req.body;

        // Check if user with the same phone already exists
        const existingUser = await usersServices.getUserByPhone(phone);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User's phone already exists. Try a new one." });
        }

        // Create new user
        const user = await usersServices.createUser(last_name, first_name, phone);
        res.status(201).json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersServices.getAllUsers();

        if (users.rows.length === 0) {
            return res.status(404).json({ error: "Users not found!" });
        }
        res.status(200).json(users.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersServices.getUserById(id);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
        }

        const { last_name, first_name, phone } = req.body;
        const { id } = req.params;
        const user = await usersServices.updateUser(id, last_name, first_name, phone);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersServices.deleteUser(id);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getUserByPhone = async (req, res) => {
    try {
        const { phone } = req.params;
        const user = await usersServices.getUserByPhone(phone);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};