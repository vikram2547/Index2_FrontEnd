// import * as yup from 'yup';

// export const addEmployeeSchema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
//   first_name: yup.string().required('First Name is required'),
//   last_name: yup.string().required('Last Name is required'),
//   phone: yup.string().required('Phone number is required'),
//   address: yup.string().required('Address is required'),
//   gender: yup.string().required('Gender is required'),
//   reports_to: yup.string().required('Reports To is required'),
//   profile_picture: yup.mixed()
// });

// export const editEmployeeSchema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   first_name: yup.string().required('First Name is required'),
//   last_name: yup.string().required('Last Name is required'),
//   phone: yup.string().required('Phone number is required'),
//   address: yup.string().required('Address is required'),
//   reports_to: yup.string().required('Reports To is required'),
//   profile_picture: yup.mixed()
// });
