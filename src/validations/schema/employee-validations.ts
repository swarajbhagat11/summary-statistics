import { Schema } from 'express-validator';

export const EmployeeValidationsSchema = {
  name: {
    in: ['body'],
    isLength: {
      errorMessage: 'Department value should be between 1 to 100 in length.',
      options: {
        max: 100,
        min: 1,
      },
    },
    trim: true,
  },
  salary: {
    in: ['body'],
    errorMessage: 'Salary should be in between 1 to 99999999999.',
    isFloat: {
      options: {
        max: 99999999999,
        min: 1,
      },
    },
    toFloat: true,
  },
  currency: {
    in: ['body'],
    isLength: {
      errorMessage: 'Currency value should be between 1 to 20 in length. eg. USD, INR',
      options: {
        max: 20,
        min: 1,
      },
    },
    trim: true,
  },
  on_contract: {
    in: ['body'],
    errorMessage: 'On contract value should be true or false.',
    optional: { options: { nullable: true } },
    isBoolean: true,
    toBoolean: true,
  },
  department: {
    in: ['body'],
    isLength: {
      errorMessage: 'Department value should be between 1 to 255 in length.',
      options: {
        max: 255,
        min: 1,
      },
    },
    trim: true,
  },
  sub_department: {
    in: ['body'],
    isLength: {
      errorMessage: 'Sub department value should be between 1 to 255 in length.',
      options: {
        max: 255,
        min: 1,
      },
    },
    trim: true,
  },
} as Schema;
