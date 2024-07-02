import express from "express";
const router = express.Router();
import { createProject,updateProject,getProject,getAllProject,deleteProject } from '../../controllers/projectControllers';
import { auth } from "../../middlewares/auth";
import { validateProjectOwnerShip } from "../../middlewares/validateProjectOwnerShip";
import { validateProjectOwnerOrMemberShip } from "../../middlewares/validateProjectOwnerOrMemberShip";
import { validateCreateProject,validateUpdateProject } from "../../joi/joiMiddlewares/validateProject";

router.post('/',validateCreateProject,auth,createProject)
router.patch('/:id',validateUpdateProject,auth,validateProjectOwnerShip('params.id','project','update'),updateProject)
router.get('/:id',auth,validateProjectOwnerOrMemberShip('params.id','project','get'),getProject)
router.get('/',auth,getAllProject)
router.delete('/:id',auth,validateProjectOwnerShip('params.id','project','delete'),deleteProject)

export default router;
