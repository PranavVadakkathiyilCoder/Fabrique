import express from "express";
import  verifyUser  from "../middleware/VerifyUser"; // Ensure this extracts `user_info`
import { getAllMessages, sendMessage } from "../controllers/Message.controller";
const router = express.Router();

router.post("/", verifyUser, sendMessage);
router.get("/", verifyUser, getAllMessages);






export default router;
