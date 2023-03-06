import { Schema } from 'express-validator';

export const UserValidationsSchema = {
  first_name: {
    in: ['body'],
    isLength: {
      errorMessage: 'First name value should be between 1 to 100 in length.',
      options: {
        max: 100,
        min: 1,
      },
    },
    trim: true,
  },
  last_name: {
    in: ['body'],
    isLength: {
      errorMessage: 'Last name value should be between 1 to 100 in length.',
      options: {
        max: 100,
        min: 1,
      },
    },
    trim: true,
  },
  email: {
    in: ['body'],
    errorMessage: 'Email should be in valid format.',
    isLength: {
      errorMessage: 'Email value should be max 100 in length.',
      options: {
        max: 100,
      },
    },
    trim: true,
    isEmail: true,
  },
  password: {
    in: ['body'],
    errorMessage: 'Password at least 8 characters in length with one lowercase, one uppercase, one special character and one digit.',
    isLength: {
      errorMessage: 'Email value should be max 255 in length.',
      options: {
        max: 255,
      },
    },
    trim: true,
    matches: { options: new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$') },
  },
} as Schema;
