import { Op } from 'sequelize';
import {
  UserRegistration
} from '@type/data/user';
import UserModel from '@app/models/user.model';
import hashData from '@app/helpers/hashData';
import sanitizeObject from '@app/helpers/sanitize';

export const registerService = async (user: UserRegistration) => {
  const userFound = await UserModel.findOne({
    where: {
      [Op.or]: [{ email: user.email }, { username: user.username }],
    },
  });

  if (userFound) {
    if (userFound.email == user.email) {
      throw new Error('email is already exists');
    } else if (userFound.username == user.username) {
      throw new Error('username is already exists');
    }
  } else {
    user.password = await hashData(user.password);

    const newUser = new UserModel(user);

    const accessToken: string = UserModel.generateAccessToken(newUser.id);
    const refreshToken: string = UserModel.generateRefreshToken(newUser.id, 1);

    newUser.refresh_token = await hashData(refreshToken);
    newUser.refresh_token_version = 1;

    await newUser.save();

    return {
      ...sanitizeObject(user, ['password']),
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
};
