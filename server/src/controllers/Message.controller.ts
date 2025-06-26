import { Request, Response } from "express";
import Chat from "../models/Chat.model";
import Message from "../models/Message.model";

interface AuthRequest extends Request {
  user_info?: any;
}
const getAllMessages = async (req: AuthRequest, res: Response) => {
  try {
    const chatId  = req.query.chatId;
    const user_id = req.user_info._id

    if (!chatId) {
       res.status(400).json({ success: false, message: "Chat ID is required." });
       return
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email") 
      .populate("chat");

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully.",
      messages,
      user:user_id
    });
  } catch (error) {
    console.error("Get All Messages Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch messages." });
  }
};
const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { content, chatId } = req.body;
    console.log(content, chatId);
    
    const senderId = req.user_info?.id;

    if (!content || !chatId) {
       res.status(400).json({ success: false, message: "Content and Chat ID are required." });
       return
    }

    
    const newMessage = await Message.create({
      sender: senderId,
      content,
      chat: chatId,
    });

    
    const fullMessage = await Message.findById(newMessage._id)
      .populate("sender", "name email")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "name email",
        },
      });
   
    await Chat.findByIdAndUpdate(chatId, {
      latestmessage: newMessage._id,
    });

     res.status(201).json({
      success: true,
      message: "Message sent successfully",
      messageData: fullMessage,
      
      
    });
    return
  } catch (error) {
    console.error("Send Message Error:", error);
     res.status(500).json({ success: false, message: "Failed to send message" });
     return
  }
};

export { getAllMessages, sendMessage };
