import { Router } from "express";
import upload from '../middleware/Multer'
import { getAllUsers, loginUser, registerUser } from "../controllers/Auth.controller";
import verifyUser from "../middleware/VerifyUser";
const router = Router()

router.route('/login').post( loginUser)
router.route('/register').post(upload.fields([{ name: 'avatar', maxCount: 1 }]),registerUser)
router.route('/alluser').post(verifyUser,getAllUsers)
//router.route('/validate').post(validate)

export default router