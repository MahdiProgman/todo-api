import api from './app/api';
import http from 'http';
import { API } from './config/config';
import { logger } from './config/logger';

const server: http.Server = http.createServer(api);

server.listen(API.PORT, () => {
  logger.info(`Server Is Listening On Port ${API.PORT}`);
});
