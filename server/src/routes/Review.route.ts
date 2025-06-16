import express from "express";
import { createReview, getReviewsForSellerProducts } from "../controllers/Review.controller";
import  verifyUser  from "../middleware/VerifyUser"; // Ensure this extracts `user_info`

const router = express.Router();

router.post("/addreivew", verifyUser, createReview);
router.get("/getsellerreview", verifyUser, getReviewsForSellerProducts);



export default router;
