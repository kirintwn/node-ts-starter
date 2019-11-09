import 'source-map-support/register';
import config from './config';
import logger from './logger';

const PORT = config.get('PORT') ?? 3000;

const server = (): string => {
  logger.debug(`The port is: ${PORT}`);
  logger.info('hello world');
  return 'hello world';
};

if (!module.parent) {
  server();
}

export default server;
