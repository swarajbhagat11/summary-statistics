import 'reflect-metadata';
import { StatisticsServiceImpl } from './statistics-service-impl';
import { EmployeeRepository } from '@repositories/employee';
import logger from '@utils/logger';
import { AppError } from '@utils/app-error';
import { SummaryStatisticsByDepartmentResponse, SummaryStatisticsBySubDepartmentResponse, SummaryStatisticsResponse } from '@types';

describe('statistics_service', () => {
  jest.mock('@utils/logger');
  let mockEmployeeRepo = jest.createMockFromModule<EmployeeRepository>('@repositories/employee');
  let statisticsService: StatisticsServiceImpl;

  beforeAll(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
    statisticsService = new StatisticsServiceImpl(mockEmployeeRepo);
  });

  it('get_summary_statistics_should_return_overall_summary_statistics', async () => {
    const mockSS = {
      min_salary: 10000,
      max_salary: 2000000,
      mean_salary: 100000,
    } as SummaryStatisticsResponse;
    mockEmployeeRepo.getSummaryStatistics = jest.fn().mockResolvedValueOnce(mockSS);

    const SSRes = await statisticsService.getSummaryStatistics();

    expect(mockEmployeeRepo.getSummaryStatistics).toHaveBeenCalledTimes(1);
    expect(SSRes[0]).toBeNull();
    expect(SSRes[1]).toEqual(mockSS);
  });

  it('get_summary_statistics_by_contract_employee_should_return_summary_statistics_based_on_contract_employees', async () => {
    const mockSSByContractEmployee = {
      min_salary: 10000,
      max_salary: 150000,
      mean_salary: 75000,
    } as SummaryStatisticsResponse;
    mockEmployeeRepo.getSummaryStatisticsByContractEmployee = jest.fn().mockResolvedValueOnce(mockSSByContractEmployee);

    const SSByContractEmpRes = await statisticsService.getSummaryStatisticsByContractEmployee();

    expect(mockEmployeeRepo.getSummaryStatisticsByContractEmployee).toHaveBeenCalledTimes(1);
    expect(SSByContractEmpRes[0]).toBeNull();
    expect(SSByContractEmpRes[1]).toEqual(mockSSByContractEmployee);
  });

  it('get_summary_statistics_by_department_should_return_summary_statistics_based_on_departments', async () => {
    const mockSSByDept = [
      {
        min_salary: 10000,
        max_salary: 150000,
        mean_salary: 40000,
        department: 'Engineering',
      },
      {
        min_salary: 20000,
        max_salary: 2000000,
        mean_salary: 1000000,
        department: 'Banking',
      },
    ] as SummaryStatisticsByDepartmentResponse[];
    mockEmployeeRepo.getSummaryStatisticsByDepartment = jest.fn().mockResolvedValueOnce(mockSSByDept);

    const SSByDeptRes = await statisticsService.getSummaryStatisticsByDepartment();

    expect(mockEmployeeRepo.getSummaryStatisticsByDepartment).toHaveBeenCalledTimes(1);
    expect(SSByDeptRes[0]).toBeNull();
    expect(SSByDeptRes[1]).toEqual(mockSSByDept);
  });

  it('get_summary_statistics_by_sub_department_should_return_summary_statistics_based_on_sub_departments', async () => {
    const mockSSBySubDept = [
      {
        min_salary: 12000,
        max_salary: 150000,
        mean_salary: 55000,
        department: 'Engineering',
        sub_department: 'IOT',
      },
      {
        min_salary: 10000,
        max_salary: 100000,
        mean_salary: 30000,
        department: 'Engineering',
        sub_department: 'Infra',
      },
      {
        min_salary: 20000,
        max_salary: 2000000,
        mean_salary: 1000000,
        department: 'Banking',
        sub_department: 'Loan',
      },
    ] as SummaryStatisticsBySubDepartmentResponse[];
    mockEmployeeRepo.getSummaryStatisticsBySubDepartment = jest.fn().mockResolvedValueOnce(mockSSBySubDept);

    const SSBySubDeptRes = await statisticsService.getSummaryStatisticsBySubDepartment();

    expect(mockEmployeeRepo.getSummaryStatisticsBySubDepartment).toHaveBeenCalledTimes(1);
    expect(SSBySubDeptRes[0]).toBeNull();
    expect(SSBySubDeptRes[1]).toEqual(mockSSBySubDept);
  });
});
