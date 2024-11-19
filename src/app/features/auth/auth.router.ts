import { Router } from 'express';
import { loginController, registerController, accessTokenController } from './auth.controller';
import validate from '@app/middlewares/validator.middleware';
import { loginSchema, userRegistration } from './auth.validator';

const router = Router();

router.post('/register', validate(userRegistration), registerController);
router.post('/login', validate(loginSchema), loginController);
router.post('/access-token', accessTokenController);

export default router;
