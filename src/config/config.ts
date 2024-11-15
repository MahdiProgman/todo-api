import config from 'config';
import { ApiConfig, SequelizeConfig } from '../types/config';

const dbConfig: SequelizeConfig = config.get<SequelizeConfig>('db');

export const API: ApiConfig = {
  PORT: config.get<number>('api.port'),
};
export const DB_CONFIG: SequelizeConfig = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: dbConfig.pool,
  logging : dbConfig.logging
};
