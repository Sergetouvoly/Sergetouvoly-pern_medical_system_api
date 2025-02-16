import yup from 'yup';

export const createPatientSchema = yup.object().shape({
    last_name: yup.string().required('Last name is required'),
    first_name: yup.string().required('First name is required'),
    date_of_birth: yup.date().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email().required('Email is required'),
    address: yup.string().required('Address is required'),
});