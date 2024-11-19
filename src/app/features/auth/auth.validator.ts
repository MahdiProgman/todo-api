import Joi from 'joi';

const usernameRegex: RegExp = /^[A-Za-z][A-Za-z0-9_]{2,19}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

export const userRegistration = Joi.object({
  first_name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().min(6).max(50).required(),
  email: Joi.string().email().required(),
  username: Joi.string().regex(usernameRegex).required(),
  password: Joi.string().regex(passwordRegex).required(),
});