import db from '../db.js';

export const createPatientService = async (last_name, first_name, date_of_birth, gender, phone, email, address) => {
    try {
        const result = await db.query(
            'INSERT INTO patients (last_name, first_name, date_of_birth, gender, phone, email, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
             [last_name, first_name, date_of_birth, gender, phone, email, address]);
        return result.rows[0]; 
    } catch (err) {
        console.error('Error creating patient:', err);
        throw err;
    }
}   ;

export const getAllPatientsService = async () => {
    try {
        const result = await db.query('SELECT * from patients ');
        return result.rows;
    } catch (err) {
        console.error('Error fetching patients:', err);
        throw err;
    }
};

export const getPatientByIdService = async (id) => {
    try {
        const result = await db.query('SELECT * from patients WHERE patient_id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching patient by ID:', err);
        throw err;
    }
};

export const updatePatientService = async (id, last_name, first_name, date_of_birth, gender, phone, email, address) => {
    try {
        const result = await db.query(
            'UPDATE patients SET last_name = $1, first_name = $2, date_of_birth = $3, gender = $4, phone = $5, email = $6, address = $7 WHERE patient_id = $8 RETURNING *',
             [last_name, first_name, date_of_birth, gender, phone, email, address, id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating patient:', err);
        throw err;
    }
};

export const deletePatientService = async (id) => {
    try {
        const result = await db.query('DELETE FROM patients WHERE patient_id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting patient:', err);
        throw err;
    }
};

export const getPatientByPhoneService = async (phone) => {
    try {
        const result = await db.query('SELECT * from patients WHERE phone = $1', [phone]);
        return result.rows;
    } catch (err) {
        console.error('Error fetching patient by phone:', err);
        throw err;
    }
};

export const getPatientByEmailService = async (email) => {
    try {
        const result = await db.query('SELECT * from patients WHERE email = $1', [email]);
        return result.rows;
    } catch (err) {
        console.error('Error fetching patient by email:', err);
        throw err;
    }
};