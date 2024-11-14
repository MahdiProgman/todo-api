import pino, { destination } from 'pino';
import * as path from 'path';
import * as fs from 'fs';
import PinoHttp from 'pino-http';

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(logDir, 'app.log'),
          translateTime: 'SYS:standard',
        },
      },
    ],
  },
});

const errorLogger = pino({
  level: 'error',
  transport: {
    target: 'pino/file',
    options: {
      destination: path.join(logDir, 'error.log'),
    },
  },
});

const loggerMiddleware = PinoHttp({
  logger: logger,
});

function logError(message: string){
  logger.error(message + 'for more details check logs folder');
}

export { logger, errorLogger, loggerMiddleware, logError };
