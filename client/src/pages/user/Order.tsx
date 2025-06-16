import { useEffect, useState } from "react";
import OrderCard from "../../components/user/OrderCard";
import { GetUserOrder } from "../../apis/order";

// Single item in an order
interface OrderItem {
  product: string; // <-- ADD THIS
  name: string;
  image: string;
  amount: number;
  size: string;
  color: string;
  Orderstatus: string;
  paymentStatus: string;
  paymentMode: string;
}

// Entire order
interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItem[];
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getuserorders = async () => {
      try {
        const res = await GetUserOrder();
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } catch (error) {
        console.log("Order", error);
      }
    };
    getuserorders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 justify-start">
        {orders.map((order) =>
          order.items.map((item, idx) => (
            <OrderCard key={`${order._id}-${idx}`} item={item} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersList;
