import * as yup from 'yup';

export const appointmentSchema = yup.object().shape({  
    doctor_id: yup.number().required('Doctor is required'),
    patient_id: yup.number().required('Patient is required'),
    appointment_date: yup.date().required('Appointment date is required'),
    status: yup.string().required('Status is required')
});