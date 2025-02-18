import {getAllDoctorsController, createDoctorController, updateDoctorController, deleteDoctorController, getDoctorByIdController} from '../controllers/doctorsController.js';
import express from 'express';

const router = express.Router();

// Define routes
router.get('/doctors', getAllDoctorsController);
router.post('/doctors', createDoctorController);
router.put('/doctors/:id', updateDoctorController);
router.delete('/doctors/:id', deleteDoctorController);
router.get('/doctors/:id', getDoctorByIdController);

export default router;
