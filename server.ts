import 'reflect-metadata';
import dotenv from 'dotenv';

// set env variables
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: __dirname + '/src/production.env' });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: __dirname + '/src/development.env' });
}

import { container } from '@configs/di-container';
import { APP_IDENTIFIERS } from '@constants/identifiers';
import { App } from 'src/app';

let summaryStats = container.get<App>(APP_IDENTIFIERS.APP);
summaryStats.listen();
