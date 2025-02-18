import {getAllMedicalRecordsService, getMedicalRecordByIdService, createMedicalRecordService, updateMedicalRecordService, deleteMedicalRecordService} from '../services/medicalRecordServices.js';
import {medicalRecordSchema} from '../validators/medicalRecordsValidators.js';

export const getAllMedicalRecordsController = async (req, res) => {
    try {
        const medicalRecords = await getAllMedicalRecordsService();
        res.status(200).json(medicalRecords);
    } catch (err) {
        console.error('Error fetching medical records:', err);
        res.status(500).json({ error: 'Error fetching medical records' });
    }
};

export const getMedicalRecordByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const medicalRecord = await getMedicalRecordByIdService(id);
        if (!medicalRecord || medicalRecord.length === 0) {
            return res.status(404).json({ error: 'Medical record not found' });
        }
        res.status(200).json(medicalRecord);
    } catch (err) {
        console.error('Error fetching medical record:', err);
        res.status(500).json({ error: 'Error fetching medical record' });
    }
}

export const createMedicalRecordController = async (req, res) => {
    try {
        const validatedData = await medicalRecordSchema.validate(req.body);
        const { patient_id, doctor_id, diagnosis, treatment, created_at } = validatedData;
        const medicalRecord = await createMedicalRecordService(patient_id, doctor_id, diagnosis, treatment, created_at);
        res.status(201).json(medicalRecord);
    } catch (err) {
        console.error('Error creating medical record:', err);
        res.status(500).json({ error: 'Error creating medical record' });
    }
}

export const updateMedicalRecordController = async (req, res) => {
    try {
        const validatedData = await medicalRecordSchema.validate(req.body);
        const { id, patient_id, doctor_id, diagnosis, treatment, created_at } = validatedData;
        const medicalRecord = await updateMedicalRecordService(id, patient_id, doctor_id, diagnosis, treatment, created_at);
        res.status(200).json(medicalRecord);
    } catch (err) {
        console.error('Error updating medical record:', err);
        res.status(500).json({ error: 'Error updating medical record' });
    }
}

export const deleteMedicalRecordController = async (req, res) => {
    try {
        const { id } = req.params;
        const medicalRecord = await deleteMedicalRecordService(id);
        if (!medicalRecord || medicalRecord.length === 0) {
            return res.status(404).json({ error: 'Medical record not found' });
        }
        res.status(200).json(medicalRecord);
    } catch (err) {
        console.error('Error deleting medical record:', err);
        res.status(500).json({ error: 'Error deleting medical record' });
    }
}