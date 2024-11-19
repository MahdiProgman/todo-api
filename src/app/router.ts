import { Router } from 'express';
import authRouter from '@app/features/auth/auth.router';

const router = Router();

router.use('/auth', authRouter);

export default router;