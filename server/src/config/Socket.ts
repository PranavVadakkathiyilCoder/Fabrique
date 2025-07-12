import { Server } from "socket.io";
import { Server as httpServer } from "http";

export const ConnectSocket = (server: httpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ User connected to ${socket.id}`);

    socket.on("makechat", (chat_id) => {
      console.log(`${socket.id} joined on ${chat_id}`);
      socket.join(chat_id);
      socket.emit("connected");
    });
    socket.on("newmsg", ({ msg, chatid, userid }) => {
      console.log({ msg, chatid, userid });
      const messageData = {
        content:msg,
        sender: userid,
        chatId:chatid,
        //
      };
      console.log(messageData);
      
      socket.to(chatid).emit("message received", messageData);

    });
    

    socket.on("disconnect", (reason) => {
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });
};
