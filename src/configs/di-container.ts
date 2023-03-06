import { Container } from 'inversify';
// App
import { App } from 'src/app';
// Routes
import { AppRoute } from 'src/app-route';
import { AuthRoute, EmployeeRoute, StatisticsRoute } from '@routes';
// controllers
import { AuthController } from '@controllers/auth';
import { AuthControllerImpl } from '@controllers/auth/auth-controller-impl';
import { EmployeeController } from '@controllers/employee';
import { EmployeeControllerImpl } from '@controllers/employee/employee-controller-impl';
import { StatisticsController } from '@controllers/statistics';
import { StatisticsControllerImpl } from '@controllers/statistics/statistics-controller-impl';
// services
import { AuthService } from '@services/auth';
import { AuthServiceImpl } from '@services/auth/auth-service-impl';
import { EmployeeService } from '@services/employee';
import { EmployeeServiceImpl } from '@services/employee/employee-service-impl';
import { StatisticsService } from '@services/statistics';
import { StatisticsServiceImpl } from '@services/statistics/statistics-service-impl';
// repositories
import { User, Employee } from '@models';
import { EmployeeRepository } from '@repositories/employee';
import { EmployeeRepositoryImpl } from '@repositories/employee/employee-repository-impl';
import { GenericRepository } from '@repositories/generic';
import { GenericRepositoryImpl } from '@repositories/generic/generic-repository-impl';
// identifiers
import {
  CONTROLLER_IDENTIFIER,
  SERVICE_IDENTIFIER,
  REPOSITORIES_IDENTIFIER,
  ROUTE_IDENTIFIERS,
  APP_IDENTIFIERS,
} from '@constants/identifiers';

let container = new Container();

// Routes
container.bind<AuthRoute>(ROUTE_IDENTIFIERS.AUTH).to(AuthRoute);
container.bind<EmployeeRoute>(ROUTE_IDENTIFIERS.EMPLOYEE).to(EmployeeRoute);
container.bind<StatisticsRoute>(ROUTE_IDENTIFIERS.STATISTICS).to(StatisticsRoute);

// Controllers
container.bind<AuthController>(CONTROLLER_IDENTIFIER.AUTH).to(AuthControllerImpl);
container.bind<EmployeeController>(CONTROLLER_IDENTIFIER.EMPLOYEE).to(EmployeeControllerImpl);
container.bind<StatisticsController>(CONTROLLER_IDENTIFIER.STATISTICS).to(StatisticsControllerImpl);

// Services
container.bind<AuthService>(SERVICE_IDENTIFIER.AUTH).to(AuthServiceImpl);
container.bind<EmployeeService>(SERVICE_IDENTIFIER.EMPLOYEE).to(EmployeeServiceImpl);
container.bind<StatisticsService>(SERVICE_IDENTIFIER.STATISTICS).to(StatisticsServiceImpl);

// Repositories
container.bind<GenericRepository<User>>(REPOSITORIES_IDENTIFIER.USER).toConstantValue(new GenericRepositoryImpl<User>(User));
container.bind<EmployeeRepository>(REPOSITORIES_IDENTIFIER.EMPLOYEE).toConstantValue(new EmployeeRepositoryImpl(Employee));

// app
container.bind<AppRoute>(APP_IDENTIFIERS.APP_ROUTE).to(AppRoute);
container.bind<App>(APP_IDENTIFIERS.APP).to(App).inSingletonScope();

export { container };
