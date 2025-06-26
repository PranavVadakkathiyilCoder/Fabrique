import express from "express";
import { createChat,getChat} from "../controllers/Chat.controller";
import  verifyUser  from "../middleware/VerifyUser"; // Ensure this extracts `user_info`
const router = express.Router();

router.post("/createchat", verifyUser, createChat);
router.get("/getchat", verifyUser, getChat);






export default router;
