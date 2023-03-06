import { Request, Response } from 'express';

export interface StatisticsController {
  getSummaryStatistics(req: Request, res: Response): Promise<Response<any>>;
  getSummaryStatisticsByContractEmployee(req: Request, res: Response): Promise<Response<any>>;
  getSummaryStatisticsByDepartment(req: Request, res: Response): Promise<Response<any>>;
  getSummaryStatisticsBySubDepartment(req: Request, res: Response): Promise<Response<any>>;
}
