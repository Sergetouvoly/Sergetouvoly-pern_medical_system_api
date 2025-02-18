import {
    createPrescriptionService, 
    getAllPrescriptionsService, 
    getPrescriptionByIdService, 
    updatePrescriptionService, 
    deletePrescriptionService} 
    from '../services/prescriptionServices.js';

import {prescriptionSchema} 
from '../validators/prescriptionValidators.js';

export const createPrescriptionController = async (req, res) => {
    try {
        const validatedData = await prescriptionSchema.validate(req.body);
        const { record_id, medication_name, dosage, instructions, prescribed_at } = validatedData;
        const prescription = await createPrescriptionService(record_id, medication_name, dosage, instructions, prescribed_at);
        res.status(200).json(prescription);
    } catch (err) {
        console.error('Error creating prescription:', err);
        res.status(500).json({ error: 'Error creating prescription' });
    }
};

export const getAllPrescriptionsController = async (req, res) => {
    try {
        const prescriptions = await getAllPrescriptionsService();
        if(!prescriptions || prescriptions.length === 0) {
            return res.status(404).json({ error: 'No prescriptions found.' });
        }
        return res.status(200).json(prescriptions);
    } catch (err) {
        console.error('Error fetching prescriptions:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getPrescriptionByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await getPrescriptionByIdService(id);
        if (!prescription || prescription.length === 0) {
            return res.status(404).json({ error: 'Prescription not found.' });
        }
        return res.status(200).json(prescription);
    } catch (err) {
        console.error('Error fetching prescription:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updatePrescriptionController = async (req, res) => {
    try {
        const { error } = prescriptionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
        }
    
        const { record_id, medication_name, dosage, instructions, prescribed_at } = req.body;
        const { id } = req.params;
        const prescription = await updatePrescriptionService(id, record_id, medication_name, dosage, instructions, prescribed_at);
    
        if (!prescription || prescription.length === 0) {
            return res.status(404).json({ error: 'Prescription not found.' });
        }
        return res.status(200).json(prescription);
    } catch (err) {
        console.error('Error updating prescription:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const deletePrescriptionController = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await deletePrescriptionService(id);
        if (!prescription || prescription.length === 0) {
            return res.status(404).json({ error: 'Prescription not found.' });
        }
        return res.status(200).json(prescription);
    } catch (err) {
        console.error('Error deleting prescription:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};