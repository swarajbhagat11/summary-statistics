import 'reflect-metadata';
import { AuthServiceImpl } from './auth-service-impl';
import { GenericRepository } from '@repositories/generic';
import { User, UserAttributes } from '@models';
import { LoginResponse } from '@types';
import logger from '@utils/logger';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '@utils/app-error';

describe('auth_service', () => {
  jest.mock('@utils/logger');
  jest.mock('jsonwebtoken');
  jest.mock('bcryptjs');
  let mockUserRepo = jest.createMockFromModule<GenericRepository<User>>('@repositories/generic');
  let authService: AuthServiceImpl;

  // mock objects
  const token = 'eyJhbGciOiJIUzI1XVCJ9.eyJ1c2VyIjoiMzk5NjFhN2JhMDE1NzM1ODAz.2E3TA64Aic4A_qGjhx2Q';
  const encryptedPassword = '$2a$10$SFqphvnvPHvtMCk3b.Te4uTVV99fuwqkkwxQ6RA0eVsqVhPnElGJG';
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
  const mockUserWithEncryptedPass = {
    ...mockUser,
    password: encryptedPassword,
  } as UserAttributes;
  const mockUserInDBResponse = {
    ...mockUserWithEncryptedPass,
    id: '230e0853-cdd8-4207-8f7d-647276b1732e',
  } as UserAttributes;

  beforeAll(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
    authService = new AuthServiceImpl(mockUserRepo);
  });

  it('register_should_get_success_when_user_not_present_in_system', async () => {
    mockUserRepo.findOne = jest.fn().mockResolvedValueOnce(null);
    mockUserRepo.create = jest.fn().mockResolvedValueOnce(mockUserInDBResponse);
    jwt.sign = jest.fn().mockReturnValueOnce(token);
    bcrypt.hash = jest.fn().mockResolvedValueOnce(encryptedPassword);

    const regRes = await authService.register(mockUser);

    expect(mockUserRepo.create).toHaveBeenCalledWith(mockUserWithEncryptedPass);
    expect(regRes[0]).toBeNull();
    expect(regRes[1]).toEqual({
      first_name,
      last_name,
      email,
      token,
    } as LoginResponse);
  });

  it('register_should_get_fail_when_user_present_in_system', async () => {
    mockUserRepo.findOne = jest.fn().mockResolvedValueOnce(mockUserInDBResponse);
    mockUserRepo.create = jest.fn();

    const regRes = await authService.register(mockUser);

    expect(mockUserRepo.create).toHaveBeenCalledTimes(0);
    expect(regRes[0]).toEqual(AppError.ConflictError('User already exist. Please login.'));
    expect(regRes[1]).toBeNull();
  });

  it('login_should_get_success_when_user_present_in_system_and_password_is_matched', async () => {
    mockUserRepo.findOne = jest.fn().mockResolvedValueOnce(mockUserInDBResponse);
    bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
    jwt.sign = jest.fn().mockReturnValueOnce(token);

    const loginRes = await authService.login({ email, password });

    expect(loginRes[0]).toBeNull();
    expect(loginRes[1]).toEqual({
      first_name,
      last_name,
      email,
      token,
    } as LoginResponse);
  });

  it('login_should_get_fail_when_user_not_present_in_system', async () => {
    mockUserRepo.findOne = jest.fn().mockResolvedValueOnce(null);

    const loginRes = await authService.login({ email, password });

    expect(loginRes[0]).toEqual(AppError.BadRequestError('Invalid credentials'));
    expect(loginRes[1]).toBeNull();
  });

  it('login_should_get_fail_when_password_is_not_matched_with_system', async () => {
    mockUserRepo.findOne = jest.fn().mockResolvedValueOnce(mockUserInDBResponse);
    bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

    const loginRes = await authService.login({ email, password });

    expect(loginRes[0]).toEqual(AppError.BadRequestError('Invalid credentials'));
    expect(loginRes[1]).toBeNull();
  });
});
