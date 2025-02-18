import db from "../db.js";

export const createPrescriptionService = async (record_id, medication_name, dosage, instructions, prescribed_at ) => {
    try {
        const prescription = await db.query(
            'INSERT INTO prescriptions (record_id, medication_name, dosage, instructions, prescribed_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [record_id, medication_name, dosage, instructions, prescribed_at]
        )
        return prescription.rows[0];
    } catch (err) {
        console.error('Error creating prescription:', err);
        throw err;
    }
};


export const getAllPrescriptionsService = async () => {
    try {
        const result = await db.query('SELECT * from prescriptions ');
        return result.rows;
    } catch (err) {
        console.error('Error fetching prescriptions:', err);
        throw err;
    }
}

export const getPrescriptionByIdService = async (id) => {
    try {
        const result = await db.query('SELECT * from prescriptions WHERE prescription_id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching prescription by ID:', err);
        throw err;
    }
}

export const updatePrescriptionService = async (id, record_id, medication_name, dosage, instructions, prescribed_at) => {
    try {
        const result = await db.query(
            'UPDATE prescriptions SET record_id = $1, medication_name = $2, dosage = $3, instructions = $4, prescribed_at = $5 WHERE prescription_id = $6 RETURNING *',
             [record_id, medication_name, dosage, instructions, prescribed_at, id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating prescription:', err);
        throw err;
    }
}

export const deletePrescriptionService = async (id) => {
    try {
        const result = await db.query('DELETE FROM prescriptions WHERE prescription_id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting prescription:', err);
        throw err;
    }
}