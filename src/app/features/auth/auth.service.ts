import { Op } from 'sequelize';
import {
  UserRegistration,
  LoginUserData,
  RefreshTokenData,
} from '@type/data/user';
import UserModel from '@app/models/user.model';
import hashData from '@app/helpers/hashData';
import sanitizeObject from '@app/helpers/sanitize';
import compareData from '@app/helpers/compareData';
import jwt from 'jsonwebtoken';
import { API } from '@config/config';

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

    const refreshToken: string = UserModel.generateAccessToken(newUser.id);
    const accessToken: string = UserModel.generateRefreshToken(newUser.id, 1);

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

export const loginService = async (user: LoginUserData) => {
  const userFound = await UserModel.findOne({
    where: {
      email: user.email,
    },
  });

  if (userFound) {
    const isPassMatch: boolean = await compareData(
      user.password,
      userFound.password,
    );
    if (isPassMatch) {
      const accessToken = UserModel.generateAccessToken(userFound.id);
      const refreshToken = UserModel.generateRefreshToken(userFound.id, 1);

      userFound.refresh_token = await hashData(refreshToken);
      userFound.refresh_token_version = 1;

      await userFound.save();

      return {
        ...sanitizeObject(userFound.dataValues, [
          'refresh_token_version',
          'refresh_token',
          'password',
          'join_date',
          'id',
        ]),
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } else {
      throw new Error('email or password is wrong');
    }
  } else {
    throw new Error('user not exists');
  }
};

export const accessTokenService = async (refreshToken: string) => {
  let decodedToken: RefreshTokenData | null;

  try {
    decodedToken = jwt.verify(
      refreshToken,
      API.REFRESH_TOKEN_SECRET,
    ) as RefreshTokenData;
  } catch (err) {
    console.log(err);
    throw new Error('your refresh token is wrong');
  }

  const userFound = await UserModel.findOne({
    where: { id: decodedToken.userId },
  });

  if (userFound) {
    if (userFound.refresh_token) {
      const isRefreshTokenMatch: boolean = await compareData(
        refreshToken,
        userFound.refresh_token,
      );
      if (
        decodedToken.version == userFound.refresh_token_version &&
        isRefreshTokenMatch
      ) {
        const accessToken = UserModel.generateAccessToken(userFound.id);
        const refreshToken = UserModel.generateRefreshToken(
          userFound.id,
          userFound.refresh_token_version + 1,
        );

        userFound.refresh_token = refreshToken;
        userFound.refresh_token_version++;

        await userFound.save();

        return {
          ...sanitizeObject(userFound.dataValues, [
            'id',
            'password',
            'refresh_token',
            'refresh_token_version',
            'password',
            'join_date',
          ]),
          access_token: accessToken,
          refresh_token: refreshToken,
        };
      } else {
        throw new Error('your refresh token is invalid');
      }
    } else {
      throw new Error('your refresh token is invalid');
    }
  } else {
    throw new Error('user not exists');
  }
};
