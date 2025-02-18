import {getAllMedicalRecordsController, getMedicalRecordByIdController, createMedicalRecordController, updateMedicalRecordController, deleteMedicalRecordController} from '../controllers/medicalRecordController.js';
import express from 'express';

const router = express.Router();

// Define routes
router.get('/medicalRecords', getAllMedicalRecordsController);
router.get('/medicalRecords/:id', getMedicalRecordByIdController);
router.post('/medicalRecords', createMedicalRecordController);
router.put('/medicalRecords/:id', updateMedicalRecordController);
router.delete('/medicalRecords/:id', deleteMedicalRecordController);

export default router;