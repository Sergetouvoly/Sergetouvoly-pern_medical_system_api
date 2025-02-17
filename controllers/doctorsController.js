import { getAllDoctorsService, updateDoctorService, createDoctorService } from '../services/doctorsServices.js';
import { createDoctorSchema } from '../validators/doctorsValidators.js';
import { checkExistence } from '../utils/dbUtils.js';

export const getAllDoctorsController = async (req,res) => {
    try {
        const doctors = await getAllDoctorsService();
        if(!doctors || doctors.length === 0) {
            return res.status(404).json({ error: 'No doctors found.' });
        }
        return res.status(201).json(doctors);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const createDoctorController = async (req, res) => {
    try {
        const validatedData = await createDoctorSchema.validate(req.body);
        const { last_name, first_name, speciality, phone, email, address } = validatedData;
    
        if (await checkExistence('doctors', 'email', email)) {
            return res.status(400).json({ error: "Email already exists." });
        }
        if (await checkExistence('doctors', 'phone', phone)) {
            return res.status(400).json({ error: "Phone already exists." });
        }
    
        const doctor = await createDoctorService(last_name, first_name, speciality, phone, email, address);
        res.status(201).json(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updateDoctorController = async (req, res) => {
    try {
        const { id } = req.params;
        const { last_name, first_name, speciality, phone, email, address } = req.body;
        if (await checkExistence('doctors', 'email', email)) {
            return res.status(400).json({ error: "Email already exists." });
        }
        if (await checkExistence('doctors', 'phone', phone)) {
            return res.status(400).json({ error: "Phone already exists." });
        }
        const doctor = await updateDoctorService(id, last_name, first_name, speciality, phone, email, address);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found!" });
        }
        res.status(200).json(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};