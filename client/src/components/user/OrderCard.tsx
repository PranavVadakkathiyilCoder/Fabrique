import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";
import { submitProductReview } from "../../apis/Reviewapi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { createChat, getMessages, sendMessage } from "../../apis/chatMessageapi";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface OrderItemProps {
  item: {
    product: string;
    name: string;
    image: string;
    amount: number;
    size: string;
    color: string;
    productcount: number;
    Orderstatus: string;
    paymentStatus: string;
    seller: string;
    paymentMode: string;
  };
  order: {
    _id: string;
    createdAt: string;
    totalAmount: number;
  };
}

const OrderCard: React.FC<OrderItemProps> = ({ item, order }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [chatPopupOpen, setChatPopupOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setmessages] = useState([])
  const [chatId, setchatId] = useState("")
  const [userId, setuserId] = useState("")

  const statusColor =
    item.Orderstatus === "Delivered"
      ? "text-green-600"
      : item.Orderstatus === "Pending"
      ? "text-yellow-600"
      : "text-blue-600";

  const statusDotColor =
    item.Orderstatus === "Delivered"
      ? "bg-green-500"
      : item.Orderstatus === "Pending"
      ? "bg-yellow-500"
      : "bg-blue-500";

  const paymentColor =
    item.paymentStatus.toLowerCase() === "completed"
      ? "text-green-600"
      : "text-red-500";

  const handleRatingClick = (star: number) => setRating(star);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReview(e.target.value);

  const submitFeedback = async () => {
    if (rating === 0 || review.trim() === "") {
      toast.error("Please select a rating and write a review.");
      return;
    }

    try {
      await submitProductReview({
        product: item.product,
        order: order._id,
        rating,
        review,
      });

      toast.success("Review submitted successfully!");
      setRating(0);
      setReview("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const ChatWithStore = async (storeId: string) => {
    try {
     const res = await createChat(storeId, order._id);
     
     const chatIdres = res.data.populatedChat._id
     console.log("hiiiiiii",chatIdres);
     setchatId(chatIdres)
     
     
      setChatPopupOpen(true);
      getmessages(chatIdres)
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSendMessage = async() => {
    if (!message.trim()) return;
    console.log("Send message:", message);
    try {
      const res =await sendMessage(message,chatId)
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
      
    }
    setMessage("");
  };
  const getmessages = async(chatId:string)=>{
    try {
      console.log(chatId);
      
      const res = await getMessages(chatId)
      console.log(res.data);
      setmessages(res.data.messages)
      setuserId(res.data.user)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  //useEffect(() => {
  //  getmessages(chatId)
  //}, [chatId])
  

  return (
    <>
      {/* Order Card */}
      <div className="col-span-1 flex flex-col sm:flex-row bg-white border border-gray-100 shadow-md rounded-2xl p-4 w-full max-w-[420px] transition hover:shadow-lg duration-200">
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-5">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">
              Color: <span className="capitalize text-gray-700">{item.color}</span> | Size:{" "}
              <span className="uppercase text-gray-700">{item.size}</span>
            </p>
            <p className="text-sm text-gray-600">Qty: {item.productcount}</p>
            <p className="text-sm text-gray-600">Amount: ₹{item.amount}</p>
            <p className="text-sm">
              Payment: <span className="capitalize">{item.paymentMode}</span> —{" "}
              <span className={`${paymentColor} capitalize font-medium`}>{item.paymentStatus}</span>
            </p>
            <p className="text-xs text-gray-400">Order ID: #{order._id.slice(-6)}</p>
            <p className="text-xs text-gray-400">
              Ordered on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${statusDotColor}`}></span>
              <span className={`text-sm font-medium ${statusColor}`}>{item.Orderstatus}</span>
            </div>
            <button
              onClick={() =>{ ChatWithStore(item.seller);getmessages(chatId)}}
              className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition-all duration-150"
            >
              <BsFillChatDotsFill className="text-sm" />
              Chat Store
            </button>
          </div>

          {item.Orderstatus === "Delivered" && (
            <div className="mt-4 border-t pt-3">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <AiFillStar
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-xl cursor-pointer ${
                      (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <textarea
                placeholder="Write your review..."
                className="w-full text-sm border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                rows={2}
                value={review}
                onChange={handleReviewChange}
              />

              <button
                onClick={submitFeedback}
                className="mt-2 w-full bg-black text-white py-1.5 text-sm rounded-md hover:bg-gray-800 transition-all"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Popup */}
      {chatPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-sm max-h-[100dvh] rounded-lg shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <p className="text-sm font-semibold text-gray-800">Order #{order._id.slice(-6)}</p>
          <p className="text-xs text-gray-500">
            Total: ₹{order.totalAmount} | {item.name}
          </p>
        </div>
        <button onClick={() => setChatPopupOpen(false)}>
          <IoClose className="text-xl text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Start chatting with the store...</p>
        ) : (
          messages.map((msg: any, index) => {
            const isSender = msg.sender._id === userId;
            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 max-w-[70%] rounded-lg text-sm ${
                    isSender
                      ? "bg-black text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Message input */}
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

    </>
  );
};

export default OrderCard;
