import { Dialect } from 'sequelize';

export interface ApiConfig {
  PORT: number;
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
