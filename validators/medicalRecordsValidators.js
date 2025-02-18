import yup from 'yup';

export const medicalRecordSchema = yup.object().shape({  
    patient_id: yup.number().required('Patient is required'),
    doctor_id: yup.number().required('Doctor is required'),
    diagnosis: yup.string().required('Diagnosis is required'),
    treatment: yup.string().required('Treatment is required'),
    created_at: yup.date().required('Created at is required')
});