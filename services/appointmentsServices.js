import db from "../db.js";

export const getAllAppointmentsService = async () => {
    try {
        const result = await db.query('SELECT * from appointments ');
        return result.rows;
    } catch (err) {
        console.error('Error fetching appointments:', err);
        throw err;
    }
};

export const getAppointmentByIdService = async (id) => {
    try {
        const result = await db.query('SELECT * from appointments WHERE appointment_id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching appointment by ID:', err);
        throw err;
    }
};

export const createAppointmentService = async (patient_id, doctor_id, appointment_date) => {
    try {
        const result = await db.query(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES ($1, $2, $3) RETURNING *',
             [patient_id, doctor_id, appointment_date]);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating appointment:', err);
        throw err;
    }
};

export const updateAppointmentService = async (id, patient_id, doctor_id, appointment_date) => {
    try {
        const result = await db.query(
            'UPDATE appointments SET patient_id = $1, doctor_id = $2, appointment_date = $3 WHERE appointment_id = $4 RETURNING *',
             [patient_id, doctor_id, appointment_date, id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating appointment:', err);
        throw err;
    }
};

export const deleteAppointmentService = async (id) => {
    try {
        const result = await db.query('DELETE FROM appointments WHERE appointment_id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting appointment:', err);
        throw err;
    }
};