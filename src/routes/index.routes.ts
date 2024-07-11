import express from 'express';
import authRouter from './auth/auth.routes'
import userRouter from './user/user.routes'
import projectRouter from './projects/projects.routes'
import featureRouter from './feature/feature.routes'
import taskRouter from './task/task.routes'
const router = express.Router();

router.use('/v1/auth', authRouter);
router.use('/v1/user', userRouter);
router.use('/v1/project', projectRouter);
router.use('/v1/feature', featureRouter);
router.use('/v1/task', taskRouter);

export default router;