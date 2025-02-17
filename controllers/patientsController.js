import { 
    createPatientService, 
    getAllPatientsService, 
    getPatientByIdService, 
    updatePatientService, 
    deletePatientService, 
    getPatientByPhoneService, 
    getPatientByEmailService 
} from '../services/patientsServices.js';

import { createPatientSchema } from '../validators/patientsValidators.js';
import { checkExistence } from '../utils/dbUtils.js';


export const createPatientController = async (req, res) => {
    try {
        const validatedData = await createPatientSchema.validate(req.body);
        const { last_name, first_name, date_of_birth, gender, phone, email, address } = validatedData;
        
        if (await checkExistence('patients', 'phone', phone)) {
            return res.status(400).json({ error: "Patient's phone already exists." });
        }
        if (await checkExistence('patients', 'email', email)) {
            return res.status(400).json({ error: "Patient's email already exists." });
        }

        const patient = await createPatientService(last_name, first_name, date_of_birth, gender, phone, email, address);
        res.status(201).json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getAllPatientsController = async (req, res) => {
    try {
        const patients = await getAllPatientsService();
        if (!patients || patients.length === 0) {
            return res.status(404).json({ error: "No patients found." });
        }
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getPatientByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await getPatientByIdService(id);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found!" });
        }
        res.status(200).json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updatePatientController = async (req, res) => {
    try {
        const { id } = req.params;
        const { last_name, first_name, date_of_birth, gender, phone, email, address } = req.body;

        const duplicateError = await checkDuplicatePatient(phone, email);
        if (duplicateError) {
            return res.status(duplicateError.status).json({ error: duplicateError.error });
        }

        const patient = await updatePatientService(id, last_name, first_name, date_of_birth, gender, phone, email, address);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found!" });
        }
        res.status(200).json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const deletePatientController = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await deletePatientService(id);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found!" });
        }
        res.status(200).json({ message: "Patient deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};
