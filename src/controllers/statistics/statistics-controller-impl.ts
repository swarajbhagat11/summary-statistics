import { SERVICE_IDENTIFIER } from '@constants/identifiers';
import { StatisticsService } from '@services/statistics';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { StatisticsController } from './statistics-controller';
import { APIResponse } from '@utils/api-response';
import logger from '@utils/logger';

// Use async & await, don't use .then(). Otherwise asyncErrorCather will not work
@injectable()
export class StatisticsControllerImpl implements StatisticsController {
  protected _statisticsService: StatisticsService;

  constructor(
    @inject(SERVICE_IDENTIFIER.STATISTICS)
    statisticsService: StatisticsService
  ) {
    this._statisticsService = statisticsService;
  }

  getSummaryStatistics = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[StatisticsControllerImpl:getSummaryStatistics] - Get overall summary statistics call started.');

    let [err, ssRes] = await this._statisticsService.getSummaryStatistics();

    logger.info('[StatisticsControllerImpl:getSummaryStatistics] - Get overall summary statistics call completed.');
    return err ? APIResponse.errorResponse(res, err) : APIResponse.okResponse(res, ssRes);
  };

  getSummaryStatisticsByContractEmployee = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info(
      '[StatisticsControllerImpl:getSummaryStatisticsByContractEmployee] - Get summary statistics by contract employee call started.'
    );

    let [err, ssRes] = await this._statisticsService.getSummaryStatisticsByContractEmployee();

    logger.info(
      '[StatisticsControllerImpl:getSummaryStatisticsByContractEmployee] - Get summary statistics by contract employee call completed.'
    );
    return err ? APIResponse.errorResponse(res, err) : APIResponse.okResponse(res, ssRes);
  };

  getSummaryStatisticsByDepartment = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[StatisticsControllerImpl:getSummaryStatisticsByDepartment] - Get summary statistics by department call started.');

    let [err, ssRes] = await this._statisticsService.getSummaryStatisticsByDepartment();

    logger.info('[StatisticsControllerImpl:getSummaryStatisticsByDepartment] - Get summary statistics by department call completed.');
    return err ? APIResponse.errorResponse(res, err) : APIResponse.okResponse(res, ssRes);
  };

  getSummaryStatisticsBySubDepartment = async (req: Request, res: Response): Promise<Response<any>> => {
    logger.info('[StatisticsControllerImpl:getSummaryStatisticsBySubDepartment] - Get summary statistics by sub department call started.');

    let [err, ssRes] = await this._statisticsService.getSummaryStatisticsBySubDepartment();

    logger.info(
      '[StatisticsControllerImpl:getSummaryStatisticsBySubDepartment] - Get summary statistics by sub department call completed.'
    );
    return err ? APIResponse.errorResponse(res, err) : APIResponse.okResponse(res, ssRes);
  };
}
