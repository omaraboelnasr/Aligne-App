import express from "express";
const router = express.Router();
import { auth } from "../../middlewares/auth";
import { validateProjectOwnerOrMemberShipByFeature } from "../../middlewares/validateProjectOwnerOrMemberShipByFeature";
import { createTask,updateTask,getTask,deleteTask,listTasks } from "../../controllers/taskControllers";
import { validateTaskOwnerOrMemberShip } from "../../middlewares/validateTaskOwnerOrMemberShip";
import { validateCreateTask, validateUpdateTask } from "../../joi/joiMiddlewares/validateTask";

router.post('/',validateCreateTask,auth,validateProjectOwnerOrMemberShipByFeature('body.featureId','task','create'),createTask)
router.patch('/:id',validateUpdateTask,auth,validateTaskOwnerOrMemberShip('params.id','task','update'),updateTask)
router.get('/:id',auth,validateTaskOwnerOrMemberShip('params.id','task','get'),getTask)
router.get('/',auth,validateProjectOwnerOrMemberShipByFeature('query.featureId','task','getAll'),listTasks)
router.delete('/:id',auth,validateTaskOwnerOrMemberShip('params.id','task','delete'),deleteTask)


export default router;
