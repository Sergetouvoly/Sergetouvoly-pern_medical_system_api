import { getAllAppointmentsController, getAppointmentByIdController, createAppointmentController, updateAppointmentController, deleteAppointmentController } from "../controllers/appointmentsController.js";
import express from 'express';

const router = express.Router();

router.get('/appointments', getAllAppointmentsController);
router.get('/appointments/:id', getAppointmentByIdController);
router.post('/appointments', createAppointmentController);
router.put('/appointments/:id', updateAppointmentController);
router.delete('/appointments/:id', deleteAppointmentController);

export default router;