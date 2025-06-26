import React, { useEffect, useState } from 'react';
import { getChat, getMessages, sendMessage } from '../../apis/chatMessageapi';
import { IoMdSend } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  pic: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  product: string;
  seller: string;
  color: string;
  size: string;
  productcount: number;
  name: string;
  image: string;
  amount: number;
  Orderstatus: string;
  paymentStatus: string;
  paymentMode: string;
}

export interface Order {
  _id: string;
  address: string;
  name: string;
  phone: number;
  pincode: number;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  user: string;
  __v: number;
}

export interface Chat {
  _id: string;
  users: User[];
  order: Order;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  const GetAllChats = async () => {
    try {
      const res = await getChat();
      setChats(res.data.Chats);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatClick = async (chat: Chat) => {
    try {
      setSelectedChat(chat);
      setChatPopupOpen(true);
      const res = await getMessages(chat._id);
      setMessages(res.data.messages);
      setUserId(res.data.user); // assuming backend returns userId
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;
    try {
      await sendMessage(message, selectedChat._id);
      const res = await getMessages(selectedChat._id);
      setMessages(res.data.messages);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllChats();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Chats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-gray-800">
              Customer: <span className="text-black">{chat.order.name}</span>
            </p>
            <p className="text-gray-700">
              Product: <span className="text-black">{chat.order.items[0]?.name || 'N/A'}</span>
            </p>
            <p className="text-gray-700 text-sm">
              Order ID: <span className="text-black">{chat.order._id.slice(-6)}</span>
            </p>
            <p className="text-gray-700 text-sm">Total: ₹{chat.order.totalAmount}</p>
            <button
              onClick={() => handleChatClick(chat)}
              className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm"
            >
              View Chat
            </button>
          </div>
        ))}
      </div>

      {chatPopupOpen && selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm max-h-[100dvh] rounded-lg shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Order #{selectedChat.order._id.slice(-6)}
                </p>
                <p className="text-xs text-gray-500">
                  Total: ₹{selectedChat.order.totalAmount} |{' '}
                  {selectedChat.order.items[0]?.name || 'Product'}
                </p>
              </div>
              <button onClick={() => setChatPopupOpen(false)}>
                <IoClose className="text-xl text-gray-600 hover:text-red-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-2">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400">Start chatting with the customer...</p>
              ) : (
                messages.map((msg, index) => {
                  const isSender = msg.sender._id === userId;
                  return (
                    <div
                      key={index}
                      className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`px-4 py-2 max-w-[70%] rounded-lg text-sm ${
                          isSender
                            ? 'bg-black text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-1.5 border rounded-full text-sm outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-black text-white rounded-full p-2 hover:bg-gray-800"
              >
                <IoMdSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
