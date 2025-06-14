import { BsFillChatDotsFill } from "react-icons/bs";

interface OrderItemProps {
  item: {
    name: string;
    image: string;
    amount: number;
    size: string;
    color: string;
    Orderstatus: string;
    paymentStatus: string;
    paymentMode: string;
  };
  order: {
    _id: string;
    createdAt: string;
    totalAmount: number;
  };
}

const OrderCard: React.FC<OrderItemProps> = ({ item, order }) => {
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

  return (
    <div className="col-span-1 flex flex-col sm:flex-row bg-white border border-gray-100 shadow-md rounded-2xl p-4 w-full max-w-[420px] transition hover:shadow-lg duration-200">
      {/* Image */}
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">
            Color: <span className="capitalize text-gray-700">{item.color}</span> | Size:{" "}
            <span className="uppercase text-gray-700">{item.size}</span>
          </p>
          <p className="text-sm text-gray-600">Amount: ₹{item.amount}</p>
          <p className="text-sm">
            Payment: <span className="capitalize">{item.paymentMode}</span> —{" "}
            <span className={`${paymentColor} capitalize font-medium`}>
              {item.paymentStatus}
            </span>
          </p>
          <p className="text-xs text-gray-400">Order ID: #{order._id.slice(-6)}</p>
          <p className="text-xs text-gray-400">
            Ordered on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${statusDotColor}`}></span>
            <span className={`text-sm font-medium ${statusColor}`}>
              {item.Orderstatus}
            </span>
          </div>

          {/* Chat */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition-all duration-150">
            <BsFillChatDotsFill className="text-sm" />
            Chat Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
