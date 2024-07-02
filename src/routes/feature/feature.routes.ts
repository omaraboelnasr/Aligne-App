import express from "express";
const router = express.Router();
import { auth } from "../../middlewares/auth";
import {createFeature,updateFeature,getAllFeature,deleteFeature} from '../../controllers/featureControllers'
import { validateProjectOwnerOrMemberShip } from "../../middlewares/validateProjectOwnerOrMemberShip";
import { validateProjectOwnerOrMemberShipByFeature } from "../../middlewares/validateProjectOwnerOrMemberShipByFeature";
import { validateCreateFeature,validateUpdateFeature } from "../../joi/joiMiddlewares/validateFeature";

router.post('/',validateCreateFeature,auth,validateProjectOwnerOrMemberShip('body.projectId','feature','create'),createFeature)
router.patch('/:id',validateUpdateFeature,auth,validateProjectOwnerOrMemberShipByFeature('params.id','feature','update'),updateFeature)
router.get('/:id',auth,validateProjectOwnerOrMemberShip('params.id','feature','get'),getAllFeature)
router.delete('/:id',auth,validateProjectOwnerOrMemberShipByFeature('params.id','feature','delete'),deleteFeature)


export default router;
