import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  last_name: yup.string().required('Last name is required'),
  first_name: yup.string().required('First name is required'),
  phone: yup.string().required('Phone is required'),
});
