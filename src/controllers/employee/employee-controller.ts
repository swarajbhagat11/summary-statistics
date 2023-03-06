import { Request, Response } from 'express';

export interface EmployeeController {
  create(req: Request, res: Response): Promise<Response<any>>;
  delete(req: Request, res: Response): Promise<Response<any>>;
}
