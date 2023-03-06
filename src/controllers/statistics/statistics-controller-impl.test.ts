import 'reflect-metadata';
import { StatisticsControllerImpl } from './statistics-controller-impl';
import { StatisticsService } from '@services/statistics';
import logger from '@utils/logger';
import { Request } from 'express';
import { AppError } from '@utils/app-error';
import { SummaryStatisticsByDepartmentResponse, SummaryStatisticsBySubDepartmentResponse, SummaryStatisticsResponse } from '@types';

describe('statistics_controller', () => {
  jest.mock('@utils/logger');
  let mockStatisticsService = jest.createMockFromModule<StatisticsService>('@services/employee');
  let statisticsController: StatisticsControllerImpl;

  // mock objects
  const token = 'eyJhbGciOiJIUzI1XVCJ9.eyJ1c2VyIjoiMzk5NjFhN2JhMDE1NzM1ODAz.2E3TA64Aic4A_qGjhx2Q';

  beforeAll(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
    statisticsController = new StatisticsControllerImpl(mockStatisticsService);
  });

  it('get_summary_statistics_should_return_ok_response_when_ss_fetch_successful', async () => {
    const mockSS = {
      min_salary: 10000,
      max_salary: 2000000,
      mean_salary: 100000,
    } as SummaryStatisticsResponse;
    mockStatisticsService.getSummaryStatistics = jest.fn().mockResolvedValueOnce([null, mockSS]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatistics(req, res as any);

    expect(mockStatisticsService.getSummaryStatistics).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('get_summary_statistics_should_return_error_response_when_ss_fetch_unsuccessful', async () => {
    mockStatisticsService.getSummaryStatistics = jest
      .fn()
      .mockResolvedValueOnce([AppError.InternalServerError('Internal server error.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatistics(req, res as any);

    expect(mockStatisticsService.getSummaryStatistics).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('get_summary_statistics_by_contract_employee_should_return_ok_response_when_ss_fetch_successful', async () => {
    const mockSSByContractEmployee = {
      min_salary: 10000,
      max_salary: 150000,
      mean_salary: 75000,
    } as SummaryStatisticsResponse;
    mockStatisticsService.getSummaryStatisticsByContractEmployee = jest.fn().mockResolvedValueOnce([null, mockSSByContractEmployee]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatisticsByContractEmployee(req, res as any);

    expect(mockStatisticsService.getSummaryStatisticsByContractEmployee).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('get_summary_statistics_by_contract_employee_should_return_error_response_when_ss_fetch_unsuccessful', async () => {
    mockStatisticsService.getSummaryStatisticsByContractEmployee = jest
      .fn()
      .mockResolvedValueOnce([AppError.InternalServerError('Internal server error.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatisticsByContractEmployee(req, res as any);

    expect(mockStatisticsService.getSummaryStatisticsByContractEmployee).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('get_summary_statistics_by_department_should_return_ok_response_when_ss_fetch_successful', async () => {
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
    mockStatisticsService.getSummaryStatisticsByDepartment = jest.fn().mockResolvedValueOnce([null, mockSSByDept]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatisticsByDepartment(req, res as any);

    expect(mockStatisticsService.getSummaryStatisticsByDepartment).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('get_summary_statistics_by_department_should_return_error_response_when_ss_fetch_unsuccessful', async () => {
    mockStatisticsService.getSummaryStatisticsByDepartment = jest
      .fn()
      .mockResolvedValueOnce([AppError.InternalServerError('Internal server error.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatisticsByDepartment(req, res as any);

    expect(mockStatisticsService.getSummaryStatisticsByDepartment).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('get_summary_statistics_by_sub_department_should_return_ok_response_when_ss_fetch_successful', async () => {
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
    mockStatisticsService.getSummaryStatisticsBySubDepartment = jest.fn().mockResolvedValueOnce([null, mockSSBySubDept]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatisticsBySubDepartment(req, res as any);

    expect(mockStatisticsService.getSummaryStatisticsBySubDepartment).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('get_summary_statistics_by_sub_department_should_return_error_response_when_ss_fetch_unsuccessful', async () => {
    mockStatisticsService.getSummaryStatisticsBySubDepartment = jest
      .fn()
      .mockResolvedValueOnce([new Error('Internal server error.'), null]);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = {
      status: jest.fn(),
    };
    res.status.mockReturnValueOnce({ json: jest.fn() });

    await statisticsController.getSummaryStatisticsBySubDepartment(req, res as any);

    expect(mockStatisticsService.getSummaryStatisticsBySubDepartment).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
