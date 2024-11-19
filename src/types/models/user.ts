import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  refresh_token: string | null;
  refresh_token_version: number | null;
  join_date: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'join_date'> {}
