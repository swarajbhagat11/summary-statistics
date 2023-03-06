import { GenericRepositoryImpl } from '../generic/generic-repository-impl';
import { Employee } from '@models';
import { SummaryStatisticsByDepartmentResponse, SummaryStatisticsBySubDepartmentResponse, SummaryStatisticsResponse } from '@types';

export interface EmployeeRepository extends GenericRepositoryImpl<Employee> {
  getSummaryStatistics(): Promise<SummaryStatisticsResponse>;
  getSummaryStatisticsByContractEmployee(): Promise<SummaryStatisticsResponse>;
  getSummaryStatisticsByDepartment(): Promise<SummaryStatisticsByDepartmentResponse[]>;
  getSummaryStatisticsBySubDepartment(): Promise<SummaryStatisticsBySubDepartmentResponse[]>;
}
