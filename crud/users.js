// const db = require('../db');
import db from "../db.js";

export const createUsers = async (last_name, first_name, phone) =>{
    const result = await db.query(
        'INSERT INTO users (last_name, first_name, phone) VALUES ($1, $2, $3) RETURNING *',
        [last_name,first_name, phone]);

    return result
}

export const getUserByPhone = async (phone) => {
    const result = await db.query(
        'SELECT * FROM users WHERE phone = $1', [phone]
    )
    return result
};