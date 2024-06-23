import express from "express";
const router = express.Router();
import { auth } from "../../middlewares/auth";
import {createFeature,updateFeature,getAllFeature,deleteFeature} from '../../controllers/featureControllers'

router.post('/:id',auth,createFeature)
router.patch('/:id',auth,updateFeature)
router.get('/:id',auth,getAllFeature)
router.delete('/:id',auth,deleteFeature)


export default router;
