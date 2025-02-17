import db from '../db.js';

export const getAllDoctorsService = async () => {
    try {
        const result = await db.query('SELECT * from doctors ');
        return result.rows;
    } catch (err) {
        console.error('Error fetching doctors:', err);
        throw err;
    }
};

export const getDoctorByIdService = async (id) => {
    try {
        const result = await db.query('SELECT * from doctors WHERE doctor_id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching doctor by ID:', err);
        throw err;
    }
};

export const createDoctorService = async (last_name, first_name, specialization) => {
    try {
        const result = await db.query(
            'INSERT INTO doctors (last_name, first_name, specialization) VALUES ($1, $2, $3) RETURNING *',
             [last_name, first_name, specialization]);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating doctor:', err);
        throw err;
    }
};

export const updateDoctorService = async (id, last_name, first_name, specialty, phone, email) => {
    try {
        const result = await db.query( 
            'UPDATE doctors SET last_name = $1, first_name = $2, specialty = $3, phone = $4, email = $5 WHERE doctor_id = $6 RETURNING *',
             [last_name, first_name, specialty, phone, email, id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating doctor:', err);
        throw err;
    }
};