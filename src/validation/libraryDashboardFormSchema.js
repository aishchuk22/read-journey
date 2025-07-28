import * as yup from 'yup';

export const addBookSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Book title is required')
    .min(1, 'Book title cannot be empty'),
  author: yup
    .string()
    .trim()
    .required('Author name is required')
    .min(1, 'Author name cannot be empty'),
  totalPages: yup
    .number()
    .typeError('Number of pages must be a valid number')
    .required('Number of pages is required')
    .positive('Number of pages must be greater than 0')
    .integer('Number of pages must be a whole number')
    .min(1, 'Number of pages must be at least 1')
});