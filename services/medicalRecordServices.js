import db from "../db.js";

import { medicalRecordSchema } from "../validators/medicalRecordsValidators.js";

export const getAllMedicalRecordsService = async () => {
    try {
        const result = await db.query('SELECT * from medical_records ');
        return result.rows;
    } catch (err) {
        console.error('Error fetching medical records:', err);
        throw err;
    }
}

export const getMedicalRecordByIdService = async (id) => {
    try {
        const result = await db.query('SELECT * from medical_records WHERE record_id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching medical record by ID:', err);
        throw err;
    }
}

export const createMedicalRecordService = async (patient_id, doctor_id, diagnosis, treatment, created_at) => {
    try {
        const result = await db.query(
            'INSERT INTO medical_records (patient_id, doctor_id, diagnosis, treatment, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [patient_id, doctor_id, diagnosis, treatment, created_at]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error creating medical record:', err);
        throw err;
    }
}

export const updateMedicalRecordService = async (id, patient_id, doctor_id, diagnosis, treatment, created_at) => {
    try {
        const result = await db.query(
            'UPDATE medical_records SET patient_id = $1, doctor_id = $2, diagnosis = $3, treatment = $4, created_at = $5 WHERE record_id = $6 RETURNING *',
            [patient_id, doctor_id, diagnosis, treatment, created_at, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error updating medical record:', err);
        throw err;
    }
}

export const deleteMedicalRecordService = async (id) => {
    try {
        const result = await db.query('DELETE FROM medical_records WHERE record_id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting medical record:', err);
        throw err;
    }
}