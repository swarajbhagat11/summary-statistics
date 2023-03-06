import { UserAttributes } from '@models';
import { LoginRequest, LoginResponse } from '@types';
import { ApplicationError } from '@utils/app-error';

export interface AuthService {
  register(user: UserAttributes): Promise<[ApplicationError | null, LoginResponse | null]>;
  login(loginReq: LoginRequest): Promise<[ApplicationError | null, LoginResponse | null]>;
}
