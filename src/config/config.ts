import config from 'config';
import { ApiConfig } from '../types/config';

export const API: ApiConfig = {
  PORT: config.get<number>('api.port'),
};
