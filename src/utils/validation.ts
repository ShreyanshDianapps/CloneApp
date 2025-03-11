
import * as Yup from 'yup';
export const validateInput = (type:string, value:string) => {
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? 'Valid Email' : 'Invalid Email';
      case 'password':
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value)
          ? 'Valid Password'
          : 'Invalid Password (Min 8 chars, 1 uppercase, 1 number, 1 special char)';
      default:
        return 'Invalid Input Type';
    }
  };

  export const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
    password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
    });
