import { EmployeeAttributes } from '@models';
import { ApplicationError } from '@utils/app-error';

export interface EmployeeService {
  create(employee: EmployeeAttributes): Promise<[ApplicationError | null, EmployeeAttributes | null]>;
  delete(employeeId: string): Promise<[ApplicationError | null, number | null]>;
}
