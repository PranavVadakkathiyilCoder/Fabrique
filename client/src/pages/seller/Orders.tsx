import { useEffect, useState } from 'react';
import { GetSellerOrder } from '../../apis/order';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBox,
  FaRupeeSign,
  FaCalendarAlt,
  FaCheckCircle,
} from 'react-icons/fa';

interface OrderItem {
  name: string;
  size: string;
  color: string;
  amount: number;
  paymentMode: string;
  paymentStatus: string;
  productcount: number;
  Orderstatus: string;
  image: string;
}

interface OrderType {
  _id: string;
  name: string;
  address: string;
  phone: number;
  pincode: number;
  user: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await GetSellerOrder();
        setOrders(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    getAllOrders();
  }, []);

  return (
    <div className="w-full px-4 py-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center tracking-tight">
        🧾 Your Seller Orders
      </h2>

      <div className="space-y-8 max-w-7xl mx-auto">
        {orders.map((order) =>
          order.items.map((item, idx) => (
            <div
              key={`${order._id}-${idx}`}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Product Image */}
              <div className="md:col-span-2 h-36 md:h-full overflow-hidden rounded-xl border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Order Info */}
              <div className="md:col-span-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 text-sm text-gray-700 gap-y-1 mt-2">
                    <p><strong>Size:</strong> {item.size}</p>
                    <p><strong>Qty:</strong> {item.productcount}</p>
                    <p><strong>Color:</strong> {item.color}</p>
                    <p className="flex items-center gap-1"><FaRupeeSign /> {item.amount}</p>
                    <p><strong>Payment:</strong> {item.paymentMode.toUpperCase()}</p>
                    <p>
                      <strong>Status:</strong>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold 
                        ${item.paymentStatus === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order ID + Date + Status */}
                <div className="mt-4 flex flex-wrap items-center text-xs text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <FaBox />
                    <span className="font-medium">Order ID:</span> {order._id}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {new Date(order.createdAt).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCheckCircle className="text-green-500" />
                    <span className="font-semibold text-green-700">{item.Orderstatus}</span>
                  </div>
                </div>
              </div>

              {/* Shipping + Status */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <div className="text-sm text-gray-800 mb-4">
                  <h4 className="font-bold mb-1 flex items-center gap-1">
                    <FaMapMarkerAlt /> Shipping Address
                  </h4>
                  <p>{order.name}</p>
                  <p>{order.address}</p>
                  <p>Pincode: {order.pincode}</p>
                  <p className="flex items-center gap-1 mt-1"><FaPhoneAlt /> {order.phone}</p>
                </div>

                <div>
                  <label htmlFor={`status-${order._id}-${idx}`} className="block text-sm font-semibold mb-1">
                    Update Order Status
                  </label>
                  <select
                    id={`status-${order._id}-${idx}`}
                    defaultValue={item.Orderstatus}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
