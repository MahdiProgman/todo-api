import { Request, Response } from 'express';
import {
  loginService,
  registerService
} from './auth.service';
import { UserRegistration } from '@type/data/user';

export async function registerController(req: Request, res: Response) {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
    }: UserRegistration = req.body;

    const result = await registerService({
      first_name,
      last_name,
      email,
      username,
      password,
    });

    if (result) {
      res
        .cookie('refresh-token', result.refresh_token, {
          httpOnly: true,
          secure: true,
          path: '/api/auth/access-token',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })
        .cookie('access-token', result.access_token, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .status(200)
        .json({
          message: 'success',
          data: result,
        });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: 'failed',
        error: err.message,
      });
    }
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await loginService({
      email,
      password,
    });

    if (result) {
      res
        .cookie('refresh-token', result.refresh_token, {
          httpOnly: true,
          secure: true,
          path: '/api/auth/access-token',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })
        .cookie('access-token', result.access_token, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .status(200)
        .json({
          message: 'success',
          data: result,
        });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: 'bad request',
        error: err.message,
      });
    }
  }
}