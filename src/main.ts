import api from './app/api';
import http from 'http';
import { API } from './config/config';
import { logger } from './config/logger';
import { connectToDB } from './config/db';

const server: http.Server = http.createServer(api);

server.listen(API.PORT, async () => {
  logger.info(`Server Is Listening On Port ${API.PORT}`);
  await connectToDB();
});
