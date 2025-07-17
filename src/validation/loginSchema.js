import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
});

export default loginSchema;