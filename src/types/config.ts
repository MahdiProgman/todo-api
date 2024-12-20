import { Dialect } from 'sequelize';

export interface ApiConfig {
  PORT: number;
  HASH_SALT: number;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

export interface SequelizeConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port: number;
  pool : {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  },
  logging : boolean;
}
