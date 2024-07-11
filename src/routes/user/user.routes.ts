import express from "express";
const router = express.Router();
import { getAllUsers } from '../../controllers/userControllers';
import { auth } from "../../middlewares/auth";

router.get('/',auth,getAllUsers)

export default router;
