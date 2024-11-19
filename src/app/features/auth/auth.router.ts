import { Router } from 'express';
import { loginController, registerController } from './auth.controller';
import validate from '@app/middlewares/validator.middleware';
import { loginSchema, userRegistration } from './auth.validator';

const router = Router();

router.post('/register', validate(userRegistration), registerController);
router.post('/login', validate(loginSchema), loginController);

export default router;
