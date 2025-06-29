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





    socket.on("disconnect", (reason) => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
    
  });
  });
};
