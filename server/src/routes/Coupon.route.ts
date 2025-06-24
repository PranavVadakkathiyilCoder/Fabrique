import express from "express";
import { addCoupon,blockCoupon,getCoupon,verifyCoupon } from "../controllers/Coupon.controller";
import  verifyUser  from "../middleware/VerifyUser"; // Ensure this extracts `user_info`
import multer from "multer";
const router = express.Router();
const upload = multer()

router.post("/addcoupon", verifyUser,upload.none(), addCoupon);
router.get("/getsellercoupon", verifyUser, getCoupon);
router.post("/verifycoupon", verifyUser, verifyCoupon);
router.post("/deletecoupon", verifyUser, blockCoupon);






export default router;
