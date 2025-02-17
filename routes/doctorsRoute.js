import {getAllDoctorsController, createDoctorController, updateDoctorController} from '../controllers/doctorsController.js';
import express from 'express';

const router = express.Router();

// Define routes
router.get('/doctors', getAllDoctorsController);
router.post('/doctors', createDoctorController);
router.put('/doctors/:id', updateDoctorController);
// router.delete('/doctors/:id', deleteDoctorController);

export default router;
