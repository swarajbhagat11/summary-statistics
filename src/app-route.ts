import { inject, injectable } from 'inversify';
import { Express } from 'express';
import { ROUTE_IDENTIFIERS } from '@constants/identifiers';
import { AuthRoute, EmployeeRoute, StatisticsRoute } from '@routes';

@injectable()
export class AppRoute {
  protected _authRoute: AuthRoute;
  protected _employeeRoute: EmployeeRoute;
  protected _statisticsRoute: StatisticsRoute;

  constructor(
    @inject(ROUTE_IDENTIFIERS.AUTH) authRoute: AuthRoute,
    @inject(ROUTE_IDENTIFIERS.EMPLOYEE) employeeRoute: EmployeeRoute,
    @inject(ROUTE_IDENTIFIERS.STATISTICS) statisticsRoute: StatisticsRoute
  ) {
    this._authRoute = authRoute;
    this._employeeRoute = employeeRoute;
    this._statisticsRoute = statisticsRoute;
  }

  routes = (app: Express) => {
    app.use('/auth', this._authRoute.routes());
    app.use('/employee', this._employeeRoute.routes());
    app.use('/statistics', this._statisticsRoute.routes());
  };
}
