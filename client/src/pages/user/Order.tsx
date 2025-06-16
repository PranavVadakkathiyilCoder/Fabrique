import { useEffect, useState } from "react";
import OrderCard from "../../components/user/OrderCard";
import OrderCardLoading from "../../components/Loading/OrderCardLoading";
import { GetUserOrder } from "../../apis/order";

interface OrderItem {
  product: string;
  name: string;
  image: string;
  amount: number;
  size: string;
  color: string;
  Orderstatus: string;
  paymentStatus: string;
  paymentMode: string;
}

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItem[];
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getuserorders = async () => {
      try {
        const res = await GetUserOrder();
        setOrders(res.data.orders);
      } catch (error) {
        console.log("Order", error);
      } finally {
        setLoading(false);
      }
    };
    getuserorders();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      {loading ? (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <OrderCardLoading key={idx} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          {orders.map((order) =>
            order.items.map((item, idx) => (
              <OrderCard key={`${order._id}-${idx}`} item={item} order={order} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
