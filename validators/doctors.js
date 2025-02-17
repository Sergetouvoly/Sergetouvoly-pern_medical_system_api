import * as yup from 'yup';

export const createDoctorSchema = yup.object().shape({
    last_name: yup.string().required('Last name is required'),
    first_name: yup.string().required('First name is required'),
    speciality: yup.string().required('Speciality is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email().required('Email is required'),
});