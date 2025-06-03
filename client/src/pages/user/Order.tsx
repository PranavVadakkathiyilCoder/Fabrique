import OrderCard from "../../components/user/OrderCard";

const OrdersList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-6 justify-start">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
};

export default OrdersList;
