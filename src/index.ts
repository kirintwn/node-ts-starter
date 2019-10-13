import 'source-map-support/register';
import config from './config';
import logger from './logger';

const PORT = config.get('PORT') || 3000;

const server = (): void => {
  logger.debug(`The port is: ${PORT}`);
  logger.info('hello world');
};

server();

export default server;
export const add = (x: number, y: number): number => x + y;
