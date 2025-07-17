import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: yup
    .string()
    .min(7, 'Minimum 7 characters')
    .required('Password is required'),
});

export default registerSchema;