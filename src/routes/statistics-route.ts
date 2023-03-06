import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { CONTROLLER_IDENTIFIER } from '@constants/identifiers';
import { asyncControllerWrapper } from '@utils/async-controller-wrapper';
import { StatisticsController } from '@controllers/statistics';
import checkUser from '@middlewares/check-user';

@injectable()
export class StatisticsRoute {
  protected _statisticsController: StatisticsController;

  constructor(@inject(CONTROLLER_IDENTIFIER.STATISTICS) statisticsController: StatisticsController) {
    this._statisticsController = statisticsController;
  }

  routes = () => {
    let router = Router();

    router.get('/', checkUser, asyncControllerWrapper(this._statisticsController.getSummaryStatistics));
    router.get('/contract-employee', checkUser, asyncControllerWrapper(this._statisticsController.getSummaryStatisticsByContractEmployee));
    router.get('/department', checkUser, asyncControllerWrapper(this._statisticsController.getSummaryStatisticsByDepartment));
    router.get('/sub-department', checkUser, asyncControllerWrapper(this._statisticsController.getSummaryStatisticsBySubDepartment));

    return router;
  };
}
