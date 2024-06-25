import express from "express";
const router = express.Router();
import { auth } from "../../middlewares/auth";
import {createFeature,updateFeature,getAllFeature,deleteFeature} from '../../controllers/featureControllers'
import { validateProjectOwnerOrMemberShip } from "../../middlewares/validateProjectOwnerOrMemberShip";
import { validateProjectOwnerOrMemberShipByFeature } from "../../middlewares/validateProjectOwnerOrMemberShipByFeature";

router.post('/:id',auth,validateProjectOwnerOrMemberShip('params.id','feature','create'),createFeature)
router.patch('/:id',auth,validateProjectOwnerOrMemberShipByFeature('params.id','feature','update'),updateFeature)
router.get('/:id',auth,validateProjectOwnerOrMemberShip('params.id','feature','get'),getAllFeature)
router.delete('/:id',auth,validateProjectOwnerOrMemberShipByFeature('params.id','feature','delete'),deleteFeature)


export default router;
