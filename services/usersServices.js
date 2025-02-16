import db from '../db.js';

// Create a new user
export const createUser = async (last_name, first_name, phone) => {
    try {
        const result = await db.query(
            'INSERT INTO users (last_name, first_name, phone) VALUES ($1, $2, $3) RETURNING *',
            [last_name, first_name, phone]
        );
        return result.rows[0]; // Return the created user
    } catch (err) {
        console.error('Error creating user:', err);
        throw err; // Propagate the error to the controller
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows; // Return all users
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
};

// Get a user by ID
export const getUserById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0]; // Return the user (or undefined if not found)
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err;
    }
};

// Update a user
export const updateUser = async (id, last_name, first_name, phone) => {
    try {
        const result = await db.query(
            'UPDATE users SET last_name = $1, first_name = $2, phone = $3 WHERE id = $4 RETURNING *',
            [last_name, first_name, phone, id]
        );
        return result.rows[0]; // Return the updated user
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0]; // Return the deleted user
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};

// Get a user by phone number
export const getUserByPhone = async (phone) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
        return result.rows[0]; // Return the user (or undefined if not found)
    } catch (err) {
        console.error('Error fetching user by phone:', err);
        throw err;
    }
};