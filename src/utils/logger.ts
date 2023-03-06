import logger from 'loglevel';
import dayjs from 'dayjs';
import chalk from 'chalk';
import prefix from 'loglevel-plugin-prefix';

const log = logger.getLogger('summary-statistics');
log.setLevel(process.env.LOG_LEVEL as logger.LogLevelDesc);
const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

prefix.reg(logger);
prefix.apply(log, {
  format(level, name) {
    let errorLevel = <'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'>level.toUpperCase();
    return colors[errorLevel](`[${dayjs().format('DD-MM-YYYY HH:mm:ss')}] [${errorLevel}] [${name}]:`);
  },
});

export default log;
