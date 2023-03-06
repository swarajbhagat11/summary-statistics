import { Schema } from 'express-validator';

export const LoginValidationsSchema = {
  email: {
    in: ['body'],
    errorMessage: 'Email can not be blank.',
    notEmpty: true,
  },
  password: {
    in: ['body'],
    errorMessage: 'Password can not be blank.',
    notEmpty: true,
  },
} as Schema;
