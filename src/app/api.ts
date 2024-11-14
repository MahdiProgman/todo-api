import express, { Request, Response } from 'express';
import { API } from '../config/config';
import cors from 'cors';
import helmetConfig from '../config/helmet';
import helmet from 'helmet';
import { loggerMiddleware } from '../config/logger';

const api = express();

api.use(cors());

api.use(loggerMiddleware);

api.use(helmet(helmetConfig));
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/', (req: Request, res: Response) => {
  res.send(
    `<h1>API Is Listening On Port <code style="background-color: black; color: white;">${API.PORT}</code></h1>`,
  );
});

export default api;
