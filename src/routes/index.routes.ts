import express from 'express';
import authRouter from './auth/auth.routes'
import projectRouter from './projects/projects.routes'
const router = express.Router();

router.use('/v1/auth', authRouter);
router.use('/v1/project', projectRouter);

export default router;