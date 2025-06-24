import express from "express";
import { createReview, getReviewsForSellerProducts,getAllReviews } from "../controllers/Review.controller";
import  verifyUser  from "../middleware/VerifyUser"; // Ensure this extracts `user_info`

const router = express.Router();

router.post("/addreivew", verifyUser, createReview);
router.get("/getsellerreview", verifyUser, getReviewsForSellerProducts);
router.get("/allreview", verifyUser, getAllReviews);



export default router;
