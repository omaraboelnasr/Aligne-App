import express from "express";
const router = express.Router();
import { auth } from "../../middlewares/auth";
import { validateProjectOwnerOrMemberShip } from "../../middlewares/validateProjectOwnerOrMemberShip";

router.post('/:id',auth,validateProjectOwnerOrMemberShip('params.id','feature','create'),)


export default router;
