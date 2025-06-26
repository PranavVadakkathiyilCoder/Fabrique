import { Request, Response } from "express";
import Review from "../models/Review.model";
import Coupon from "../models/Coupon.model";
import Chat from "../models/Chat.model";

interface AuthRequest extends Request {
  user_info?: any;
}
const createChat = async (req: AuthRequest, res: Response) => {
  try {
    const { storeId,orderId } = req.body;
    console.log(req.body);

    const userId = req.user_info.id;

    if (!storeId || !orderId) {
      res.status(400).json({ message: "Order or Store required" });
      return;
    }

    const existingChat = await Chat.findOne({
      users: { $all: [userId, storeId] },
      order:orderId
    })
      .populate("users", "-password")
      .populate("latestMessage");
    
      if (existingChat) {
        const populatedChat = await Chat.populate(existingChat, {
          path: "latestMessage.sender",
          select: "name email",
        });
      res.status(201).json({ success: true, message: "Get All chat", populatedChat });
    return;
    }
    const chatData = {
        order:orderId,
        users:[userId,storeId]


    }
    const newChat = await Chat.create(chatData);
    const fullChat = await Chat.findById(newChat._id).populate("users", "-password");

    res.status(200).json({ success: true, message: "Chat created", chat: fullChat,userId });
    
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getChat = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user_info.id;

    const existing = await Chat.find({ users: { $in: [userId] } })
    .populate("users")
    .populate("order")
    if (!existing) {
      res.status(400).json({ message: "You Have No chats" });
      return;
    }

    res
      .status(201)
      .json({ success: true, message: "All chats", Chats:existing });
    return;
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createChat, getChat };
