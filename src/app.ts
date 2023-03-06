import { cors_options } from '@configs/app-config';
import { APP_IDENTIFIERS } from '@constants/identifiers';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { inject, injectable } from 'inversify';
import { AppRoute } from './app-route';
import httpContext from 'express-http-context';
import process from 'process';
import { globalErrorHandler, processUnhandledError } from '@middlewares/global-error-handler';

@injectable()
export class App {
  app = express();
  port = process.env.PORT || 3000;
  _appRoute: AppRoute;

  constructor(@inject(APP_IDENTIFIERS.APP_ROUTE) appRoute: AppRoute) {
    this._appRoute = appRoute;
  }

  listen = () => {
    // processUnhandledError shoudle be at top of middleware registration
    this.app.use(processUnhandledError);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors(cors_options));
    // put it as a last middleware
    this.app.use(httpContext.middleware);

    // defining routes
    this._appRoute.routes(this.app);

    // should call globalErrorHandler middleware immediate after routes
    this.app.use(globalErrorHandler);

    this.app.listen(this.port, async () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  };
}
