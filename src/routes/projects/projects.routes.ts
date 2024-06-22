import express from "express";
const router = express.Router();
import { createProject,updateProject,getProject,getAllProject,deleteProject } from '../../controllers/projectControllers';
import { auth } from "../../middlewares/auth";
router.post('/',auth,createProject)
router.patch('/:id',auth,updateProject)
router.get('/:id',auth,getProject)
router.get('/',auth,getAllProject)
router.delete('/:id',auth,deleteProject)

export default router;
