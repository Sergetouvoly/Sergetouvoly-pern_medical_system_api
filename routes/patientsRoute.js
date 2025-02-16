import {createPatientController, getAllPatientsController, getPatientByIdController, updatePatientController, deletePatientController} from '../controllers/patientsController.js';

import express from 'express';

const router = express.Router();

// Define routes
router.post('/', createPatientController);
router.get('/', getAllPatientsController);  
router.get('/:id', getPatientByIdController);
router.put('/:id', updatePatientController);
router.delete('/:id', deletePatientController);

export default router;
