import  {createPatientService, getAllPatientsService, getPatientByIdService, updatePatientService, deletePatientService, getPatientByPhoneService} from '../services/patientsServices.js';
import {createPatientSchema} from '../validators/patientsValidators.js';


export const createPatientController = async (req, res) => {
    try {
        const validatedData = await createPatientSchema.validate(req.body);
        const { last_name, first_name, date_of_birth, gender, phone, email, address } = validatedData;
        const exitspatient = await getPatientByPhoneService(phone);
        if(exitspatient.length > 0){
            return res.status(400).json({ error: "patient's phone already exists. Try a new one." });
        }
        // Create Patient
        const patient = await createPatientService(last_name, first_name, date_of_birth, gender, phone, email, address);
       
        console.log("patient",patient);
        res.status(201).json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllPatientsController = async (req, res) => {
    try {
        const patients = await getAllPatientsService();
        if (patients.length === 0) {
            return res.status(404).json({ error: "Patients not found!" });
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
        if (patient.length === 0) {
            return res.status(404).json({ error: "Patient not found!" });
        }
        res.status(200).json(patient[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updatePatientController = async (req, res) => {
    try {
        const { id } = req.params;
        const { last_name, first_name, date_of_birth, gender, phone, email, address } = req.body;
        const patient = await updatePatientService(id, last_name, first_name, date_of_birth, gender, phone, email, address);
        if (patient.length === 0) {
            return res.status(404).json({ error: "Patient not found!" });
        }
        res.status(200).json(patient[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const deletePatientController = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await deletePatientService(id);
        if (patient.length === 0) {
            return res.status(404).json({ error: "Patient not found!" });
        }
        res.status(200).json(patient[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};