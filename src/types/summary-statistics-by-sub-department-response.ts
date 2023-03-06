import { SummaryStatisticsByDepartmentResponse } from './summary-statistics-by-department-response';

export interface SummaryStatisticsBySubDepartmentResponse extends SummaryStatisticsByDepartmentResponse {
  sub_department: string;
}
