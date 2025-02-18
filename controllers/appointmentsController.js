import {getAppointmentByIdService, getAllAppointmentsService, createAppointmentService, deleteAppointmentService, updateAppointmentService} from '../services/appointmentsServices.js';
import {appointmentSchema} from '../validators/appointmentsValidators.js';
// import {checkExistence} from '../utils/dbUtils.js';

export const getAllAppointmentsController = async (req, res) => {
    try {
        const appointments = await getAllAppointmentsService();
        if(!appointments || appointments.length === 0) {
            return res.status(404).json({ error: 'No appointments found.' });
        }
        return res.status(201).json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const getAppointmentByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(id);
        if (!appointment || appointment.length === 0) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        return res.status(201).json(appointment);
    } catch (err) {
        console.error('Error fetching appointment:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const createAppointmentController = async (req, res) => {
    try {
        const validatedData = await appointmentSchema.validate(req.body);
        const {doctor_id, patient_id, appointment_date, status} = validatedData;
                
        const appointment = await createAppointmentService(doctor_id, patient_id, appointment_date, status);
        return res.status(201).json(appointment);
    } catch (err) {
        console.error('Error creating appointment:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const deleteAppointmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await deleteAppointmentService(id);
        if (!appointment || appointment.length === 0) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        return res.status(201).json(appointment);
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

export const updateAppointmentController = async (req, res) => {
    try {
        const { error } = appointmentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
        }
    
        const { doctor_id, patient_id, appointment_date, status } = req.body;
        const { id } = req.params;
        const appointment = await updateAppointmentService(id, doctor_id, patient_id, appointment_date, status);
    
        if (!appointment || appointment.length === 0) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        return res.status(200).json(appointment);
    } catch (err) {
        console.error('Error updating appointment:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};