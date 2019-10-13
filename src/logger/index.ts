import { createLogger, format, transports } from 'winston';
import formatLogArgs from './format-log-args';

const { NODE_ENV } = process.env;

const getLoggerLevel = (env: string | undefined): string => {
  switch (env) {
    case 'test':
      return 'info';
    case 'production':
      return 'info';
    default:
      return 'debug';
  }
};
const logFormat = format.printf(({ level, message }) => `${level} ${message}`);
const logger = createLogger();
logger.add(
  new transports.Console({
    level: getLoggerLevel(NODE_ENV),
    format: format.combine(format.colorize(), format.prettyPrint(), logFormat),
  }),
);

export default {
  debug: (message): void => {
    logger.debug(formatLogArgs(message, 'debug'.length));
  },
  info: (message): void => {
    logger.info(formatLogArgs(message, 'info'.length));
  },
  warn: (message): void => {
    logger.warn(formatLogArgs(message, 'warn'.length));
  },
  error: (message): void => {
    logger.error(formatLogArgs(message, 'error'.length));
  },
};
