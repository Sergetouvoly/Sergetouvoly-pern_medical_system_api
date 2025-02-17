import {createPatientController, getAllPatientsController, getPatientByIdController, updatePatientController, deletePatientController} from '../controllers/patientsController.js';

import express from 'express';

const router = express.Router();

// Define routes
router.post('/patients', createPatientController);
router.get('/patients', getAllPatientsController);  
router.get('/patients/:id', getPatientByIdController);
router.put('/patients/:id', updatePatientController);
router.delete('/patients/:id', deletePatientController);

export default router;
