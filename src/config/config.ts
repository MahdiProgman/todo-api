import config from 'config';
import { ApiConfig, SequelizeConfig } from '@type/config';

const dbConfig: SequelizeConfig = config.get<SequelizeConfig>('db');

export const API: ApiConfig = {
  PORT: config.get<number>('api.port'),
  HASH_SALT: config.get<number>('api.hash_salt'),
  ACCESS_TOKEN_SECRET: config.get<string>('api.access_token_secret'),
  REFRESH_TOKEN_SECRET: config.get<string>('api.refresh_token_secret')
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