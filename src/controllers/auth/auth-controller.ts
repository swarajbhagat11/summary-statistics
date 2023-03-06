import { NextFunction, Request, Response } from 'express';

export interface AuthController {
  register(req: Request, res: Response): Promise<Response<any>>;
  login(req: Request, res: Response): Promise<Response<any>>;
}
