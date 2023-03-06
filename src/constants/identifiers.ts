export const CONTROLLER_IDENTIFIER = {
  AUTH: Symbol.for('AuthController'),
  STATISTICS: Symbol.for('StatisticsController'),
  EMPLOYEE: Symbol.for('EmployeeController'),
};

export const SERVICE_IDENTIFIER = {
  AUTH: Symbol.for('AuthService'),
  STATISTICS: Symbol.for('StatisticsService'),
  EMPLOYEE: Symbol.for('EmployeeService'),
};

export const REPOSITORIES_IDENTIFIER = {
  USER: Symbol.for('GenericRepository<User>'),
  EMPLOYEE: Symbol.for('GenericRepository<Employee>'),
};

export const ROUTE_IDENTIFIERS = {
  AUTH: Symbol.for('AuthRoute'),
  STATISTICS: Symbol.for('StatisticsRoute'),
  EMPLOYEE: Symbol.for('EmployeeRoute'),
};

export const APP_IDENTIFIERS = {
  APP_ROUTE: Symbol.for('AppRoute'),
  APP: Symbol.for('App'),
};
