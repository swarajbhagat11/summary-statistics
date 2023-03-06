import { SummaryStatisticsByDepartmentResponse, SummaryStatisticsBySubDepartmentResponse, SummaryStatisticsResponse } from '@types';
import { ApplicationError } from '@utils/app-error';

export interface StatisticsService {
  getSummaryStatistics(): Promise<[ApplicationError | null, SummaryStatisticsResponse | null]>;
  getSummaryStatisticsByContractEmployee(): Promise<[ApplicationError | null, SummaryStatisticsResponse | null]>;
  getSummaryStatisticsByDepartment(): Promise<[ApplicationError | null, SummaryStatisticsByDepartmentResponse[] | null]>;
  getSummaryStatisticsBySubDepartment(): Promise<[ApplicationError | null, SummaryStatisticsBySubDepartmentResponse[] | null]>;
}
