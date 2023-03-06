import { REPOSITORIES_IDENTIFIER } from '@constants/identifiers';
import { EmployeeRepository } from '@repositories/employee';
import { inject, injectable } from 'inversify';
import { ApplicationError } from '@utils/app-error';
import logger from '@utils/logger';
import { StatisticsService } from './statistics-service';
import { SummaryStatisticsByDepartmentResponse, SummaryStatisticsBySubDepartmentResponse, SummaryStatisticsResponse } from '@types';

@injectable()
export class StatisticsServiceImpl implements StatisticsService {
  protected _employeeRepo: EmployeeRepository;

  constructor(
    @inject(REPOSITORIES_IDENTIFIER.EMPLOYEE)
    employeeRepo: EmployeeRepository
  ) {
    this._employeeRepo = employeeRepo;
  }

  getSummaryStatistics = async (): Promise<[ApplicationError | null, SummaryStatisticsResponse | null]> => {
    logger.info('[StatisticsServiceImpl:getSummaryStatistics] - Get overall summary statistics service call started.');

    const summaryStats = await this._employeeRepo.getSummaryStatistics();

    logger.info('[StatisticsServiceImpl:getSummaryStatistics] - Get overall summary statistics service call completed.');
    return [null, summaryStats];
  };

  getSummaryStatisticsByContractEmployee = async (): Promise<[ApplicationError | null, SummaryStatisticsResponse | null]> => {
    logger.info(
      '[StatisticsServiceImpl:getSummaryStatisticsByContractEmployee] - Get summary statistics by contract employee service call started.'
    );

    const summaryStats = await this._employeeRepo.getSummaryStatisticsByContractEmployee();

    logger.info(
      '[StatisticsServiceImpl:getSummaryStatisticsByContractEmployee] - Get summary statistics by contract employee service call completed.'
    );
    return [null, summaryStats];
  };

  getSummaryStatisticsByDepartment = async (): Promise<[ApplicationError | null, SummaryStatisticsByDepartmentResponse[] | null]> => {
    logger.info('[StatisticsServiceImpl:getSummaryStatisticsByDepartment] - Get summary statistics by department service call started.');

    const summaryStats = await this._employeeRepo.getSummaryStatisticsByDepartment();

    logger.info('[StatisticsServiceImpl:getSummaryStatisticsByDepartment] - Get summary statistics by department service call completed.');
    return [null, summaryStats];
  };

  getSummaryStatisticsBySubDepartment = async (): Promise<[ApplicationError | null, SummaryStatisticsBySubDepartmentResponse[] | null]> => {
    logger.info(
      '[StatisticsServiceImpl:getSummaryStatisticsBySubDepartment] - Get summary statistics by sub department service call started.'
    );

    const summaryStats = await this._employeeRepo.getSummaryStatisticsBySubDepartment();

    logger.info(
      '[StatisticsServiceImpl:getSummaryStatisticsBySubDepartment] - Get summary statistics by sub department service call completed.'
    );
    return [null, summaryStats];
  };
}
