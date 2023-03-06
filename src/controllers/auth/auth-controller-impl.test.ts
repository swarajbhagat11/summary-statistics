import 'reflect-metadata';
import { AuthControllerImpl } from './auth-controller-impl';
import { AuthService } from '@services/auth';
import { UserAttributes } from '@models';
import logger from '@utils/logger';
import { Request } from 'express';
import { AppError } from '@utils/app-error';
import { LoginRequest, LoginResponse } from '@types';

describe('auth_controller', () => {
  jest.mock('@utils/logger');
  let mockAuthService = jest.createMockFromModule<AuthService>('@services/auth');
  let authController: AuthControllerImpl;

  // mock objects
  const token = 'eyJhbGciOiJIUzI1XVCJ9.eyJ1c2VyIjoiMzk5NjFhN2JhMDE1NzM1ODAz.2E3TA64Aic4A_qGjhx2Q';
  const first_name = 'Akash';
  const last_name = 'Patil';
  const email = 'akash.patil@test.com';
  const password = 'Test@2022';
  const mockUser = {
    first_name,
    last_name,
    email,
    password,
  } as UserAttributes;
  const loginResponse = {
    first_name,
    last_name,
    email,
    token,
  } as LoginResponse;
  const loginRequest = {
    email,
    password,
  } as LoginRequest;

  beforeAll(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
    authController = new AuthControllerImpl(mockAuthService);
  });

  it('register_should_return_create_response_when_user_creation_successful', async () => {
    mockAuthService.register = jest.fn().mockResolvedValueOnce([null, loginResponse]);
    const req = { headers: { authorization: `Bearer ${token}` }, body: mockUser } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await authController.register(req, res as any);

    expect(mockAuthService.register).toHaveBeenCalledWith(mockUser);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('register_should_return_error_response_when_user_creation_unsuccessful', async () => {
    mockAuthService.register = jest.fn().mockResolvedValueOnce([AppError.ConflictError('User already exist. Please login.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` }, body: mockUser } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await authController.register(req, res as any);

    expect(mockAuthService.register).toHaveBeenCalledWith(mockUser);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('login_should_return_ok_response_when_user_login_successful', async () => {
    mockAuthService.login = jest.fn().mockResolvedValueOnce([null, loginResponse]);
    const req = { headers: { authorization: `Bearer ${token}` }, body: loginRequest } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await authController.login(req, res as any);

    expect(mockAuthService.login).toHaveBeenCalledWith(loginRequest);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('login_should_return_error_response_when_user_login_unsuccessful', async () => {
    mockAuthService.login = jest.fn().mockResolvedValueOnce([AppError.BadRequestError('Invalid credentials'), null]);
    const req = { headers: { authorization: `Bearer ${token}` }, body: loginRequest } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await authController.login(req, res as any);

    expect(mockAuthService.login).toHaveBeenCalledWith(loginRequest);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
