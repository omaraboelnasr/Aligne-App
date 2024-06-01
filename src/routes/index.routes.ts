import express from 'express';
import authRouter from './auth/auth.routes'
const router = express.Router();

router.use('/v1/auth', authRouter);

export default router;