import { SummaryStatisticsResponse } from './summary-statistics-response';

export interface SummaryStatisticsByDepartmentResponse extends SummaryStatisticsResponse {
  department: string;
}
