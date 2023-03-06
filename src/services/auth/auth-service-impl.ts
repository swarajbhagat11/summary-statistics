import { REPOSITORIES_IDENTIFIER } from '@constants/identifiers';
import { User, UserAttributes } from '@models';
import { GenericRepository } from '@repositories/generic';
import { inject, injectable } from 'inversify';
import { AuthService } from '.';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError, ApplicationError } from '@utils/app-error';
import { LoginRequest, LoginResponse } from '@types';
import logger from '@utils/logger';
import { encrypt } from '@utils/cryptography';

@injectable()
export class AuthServiceImpl implements AuthService {
  protected _userRepo: GenericRepository<User>;

  constructor(
    @inject(REPOSITORIES_IDENTIFIER.USER)
    userRepo: GenericRepository<User>
  ) {
    this._userRepo = userRepo;
  }

  register = async (user: UserAttributes): Promise<[ApplicationError | null, LoginResponse | null]> => {
    logger.info('[authServiceImpl:register] - Register service call started.');
    const existingUser = await this._userRepo.findOne({ where: { email: user.email } });
    if (existingUser) {
      logger.error('[authServiceImpl:register] - User already exist.');
      return [AppError.ConflictError('User already exist. Please login.'), null];
    }

    //Encrypt user password
    user.password = await bcrypt.hash(user.password, 10);
    let createUserRes = await this._userRepo.create(user);

    logger.info('[authServiceImpl:register] - Register service call completed.');
    return [null, this._createToken(createUserRes)];
  };

  login = async (loginReq: LoginRequest): Promise<[ApplicationError | null, LoginResponse | null]> => {
    logger.info('[authServiceImpl:login] - Login service call started.');
    const user = await this._userRepo.findOne({ where: { email: loginReq.email } });

    if (user && (await bcrypt.compare(loginReq.password, user.password))) {
      logger.info('[authServiceImpl:login] - Login service call completed.');
      return [null, this._createToken(user)];
    } else {
      logger.error('[authServiceImpl:login] - Invalid credentials!');
      return [AppError.BadRequestError('Invalid credentials'), null];
    }
  };

  _createToken = (user: UserAttributes): LoginResponse => {
    logger.info('[authServiceImpl:_createToken] - _createToken call started.');

    const userPayload = { user_id: user.id, email: user.email };
    const encryptedPayload = encrypt(userPayload);
    const token = jwt.sign({ user: encryptedPayload }, process.env.TOKEN_KEY as jwt.Secret, {
      expiresIn: process.env.SESSION_TIMEOUT as string,
    });
    let { first_name, last_name, email } = user;

    logger.info('[authServiceImpl:_createToken] - _createToken call completed.');
    return { first_name, last_name, email, token } as LoginResponse;
  };
}
