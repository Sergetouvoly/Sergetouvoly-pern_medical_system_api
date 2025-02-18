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

export const getDoctorByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await getDoctorByIdService(id);
        if (!doctor || doctor.length === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (err) {
        console.error('Error fetching doctor by ID:', err);
        res.status(500).json({ error: 'Error fetching doctor by ID' });
    }
}
export const getDoctorByIdService = async (id) => {
    try {
        const result = await db.query('SELECT * from doctors WHERE doctor_id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching doctor by ID:', err);
        throw err;
    }
};

export const createDoctorService = async (last_name, first_name, specialty, phone, email) => {
    try {
        const result = await db.query(
            'INSERT INTO doctors (last_name, first_name, specialty, phone, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
             [last_name, first_name, specialty, phone, email]);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating doctor:', err);
        throw err;
    }
};

export const updateDoctorService = async (id, last_name, first_name, specialty, phone, email) => {
    try {
        console.log('specialty:', specialty)
        const result = await db.query( 
            'UPDATE doctors SET last_name = $1, first_name = $2, specialty = $3, phone = $4, email = $5 WHERE doctor_id = $6 RETURNING *',
             [last_name, first_name, specialty, phone, email, id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating doctor:', err);
        throw err;
    }
};

export const deleteDoctorService = async (id) => {
    try {
        const result = await db.query('DELETE FROM doctors WHERE doctor_id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting doctor:', err);
        throw err;
    }
};