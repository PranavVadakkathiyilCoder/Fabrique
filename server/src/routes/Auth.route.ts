import { Router } from "express";
import upload from '../middleware/Multer'
import { changeRole, getAllUsers, getCurrentSellerInfo, getCurrentUserInfo, loginUser, logoutUser, registerUser,validateuser } from "../controllers/Auth.controller";
import verifyUser from "../middleware/VerifyUser";
const router = Router()

router.route('/login').post( loginUser)
router.route('/validate').get(verifyUser,validateuser)

router.route('/register').post(upload.fields([{ name: 'avatar', maxCount: 1 }]),registerUser)
router.route('/alluser').post(verifyUser,getAllUsers)
router.route('/sellerdata').get(verifyUser,getCurrentSellerInfo)
router.route('/userdata').get(verifyUser,getCurrentUserInfo)

router.route('/logout').post(verifyUser,logoutUser)
router.route('/rolechange').post(verifyUser,changeRole)


//router.route('/validate').post(validate)

export default router