import express from 'express';
import authRouter from './auth/auth.routes'
import projectRouter from './projects/projects.routes'
import featureRouter from './feature/feature.routes'
const router = express.Router();

router.use('/v1/auth', authRouter);
router.use('/v1/project', projectRouter);
router.use('/v1/feature', featureRouter);
// router.use('/v1/task', );

export default router;