import { Router } from 'express';
import { registerController } from './auth.controller';
import validate from '@app/middlewares/validator.middleware';
import { userRegistration } from './auth.validator';

const router = Router();

router.post('/register', validate(userRegistration), registerController);

export default router;
