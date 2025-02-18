import yup from 'yup';

export const prescriptionSchema = yup.object().shape({
    record_id: yup.number().required('Record is required'),
    medication_name: yup.string().required('Medication name is required'),
    dosage: yup.string().required('Dosage is required'),
    instructions: yup.string().required('Instructions are required'),
    prescribed_at: yup.date().required('Prescribed at is required'),
    
});

