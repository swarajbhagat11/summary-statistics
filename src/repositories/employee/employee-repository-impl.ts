import { ModelStatic } from 'sequelize';
import { injectable } from 'inversify';
import { Employee } from '@models';
import { GenericRepositoryImpl } from '@repositories/generic/generic-repository-impl';
import { SummaryStatisticsByDepartmentResponse, SummaryStatisticsBySubDepartmentResponse, SummaryStatisticsResponse } from '@types';
import sequelize from 'sequelize';
import logger from '@utils/logger';

@injectable()
export class EmployeeRepositoryImpl extends GenericRepositoryImpl<Employee> {
  constructor(model: ModelStatic<Employee>) {
    super(model);
  }

  summaryStatsAttr = [
    [sequelize.fn('min', sequelize.col('salary')), 'min_salary'] as sequelize.ProjectionAlias,
    [sequelize.fn('max', sequelize.col('salary')), 'max_salary'] as sequelize.ProjectionAlias,
    [sequelize.fn('avg', sequelize.col('salary')), 'mean_salary'] as sequelize.ProjectionAlias,
  ] as (string | sequelize.ProjectionAlias)[];

  async getSummaryStatistics(): Promise<SummaryStatisticsResponse> {
    logger.info('[EmployeeRepositoryImpl:getSummaryStatistics] - Get overall summary statistics repository call started.');

    const summaryStats = await this.model
      .findOne({ attributes: this.summaryStatsAttr })
      .then((data) => this._castToSummaryStatistics(data));

    logger.info('[EmployeeRepositoryImpl:getSummaryStatistics] - Get overall summary statistics repository call completed.');
    return summaryStats as SummaryStatisticsResponse;
  }

  async getSummaryStatisticsByContractEmployee(): Promise<SummaryStatisticsResponse> {
    logger.info(
      '[EmployeeRepositoryImpl:getSummaryStatisticsByContractEmployee] - Get summary statistics by contract employee repository call started.'
    );

    const summaryStats = await this.model
      .findOne({ where: { on_contract: true }, attributes: this.summaryStatsAttr })
      .then((data) => this._castToSummaryStatistics(data));

    logger.info(
      '[EmployeeRepositoryImpl:getSummaryStatisticsByContractEmployee] - Get summary statistics by contract employee repository call completed.'
    );
    return summaryStats as SummaryStatisticsResponse;
  }

  async getSummaryStatisticsByDepartment(): Promise<SummaryStatisticsByDepartmentResponse[]> {
    logger.info(
      '[EmployeeRepositoryImpl:getSummaryStatisticsByDepartment] - Get summary statistics by department repository call started.'
    );

    const selectAttr = [...this.summaryStatsAttr];
    selectAttr.push('department');
    const summaryStats = await this.model
      .findAll({ attributes: selectAttr, group: ['department'] })
      .then((data) => data.map((item) => this._castToSummaryStatisticsByDepartment(item)));

    logger.info(
      '[EmployeeRepositoryImpl:getSummaryStatisticsByDepartment] - Get summary statistics by department repository call completed.'
    );
    return summaryStats;
  }

  async getSummaryStatisticsBySubDepartment(): Promise<SummaryStatisticsBySubDepartmentResponse[]> {
    logger.info(
      '[EmployeeRepositoryImpl:getSummaryStatisticsBySubDepartment] - Get summary statistics by sub department repository call started.'
    );

    const selectAttr = [...this.summaryStatsAttr];
    selectAttr.push('department');
    selectAttr.push('sub_department');
    const summaryStats = await this.model
      .findAll({ attributes: selectAttr, group: ['department', 'sub_department'] })
      .then((data) => data.map((item) => this._castToSummaryStatisticsBySubDepartment(item)));

    logger.info(
      '[EmployeeRepositoryImpl:getSummaryStatisticsBySubDepartment] - Get summary statistics by sub department repository call completed.'
    );
    return summaryStats;
  }

  _castToSummaryStatistics(item: any): SummaryStatisticsResponse {
    return {
      min_salary: item.get('min_salary'),
      max_salary: item.get('max_salary'),
      mean_salary: item.get('mean_salary'),
    } as SummaryStatisticsResponse;
  }

  _castToSummaryStatisticsByDepartment(item: any): SummaryStatisticsByDepartmentResponse {
    return {
      ...this._castToSummaryStatistics(item),
      department: item.get('department'),
    } as SummaryStatisticsByDepartmentResponse;
  }

  _castToSummaryStatisticsBySubDepartment(item: any): SummaryStatisticsBySubDepartmentResponse {
    return {
      ...this._castToSummaryStatisticsByDepartment(item),
      sub_department: item.get('sub_department'),
    } as SummaryStatisticsBySubDepartmentResponse;
  }
}
