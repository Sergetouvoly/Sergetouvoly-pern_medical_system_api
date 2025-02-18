import {createPrescriptionController, getAllPrescriptionsController, getPrescriptionByIdController, updatePrescriptionController, deletePrescriptionController} from "../controllers/prescriptionController.js";

import express from 'express';
const router = express.Router();

// Define routes
router.post('/prescriptions', createPrescriptionController);
router.get('/prescriptions', getAllPrescriptionsController);
router.get('/prescriptions/:id', getPrescriptionByIdController);
router.put('/prescriptions/:id', updatePrescriptionController);
router.delete('/prescriptions/:id', deletePrescriptionController);

export default router;          