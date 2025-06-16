import CartCard from "../../components/user/CartCard";
import CartLoading from "../../components/Loading/CartLoading";
import { LuTag } from "react-icons/lu";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getcart } from "../../apis/cartapi";
import { useNavigate } from "react-router-dom";

interface ProductType {
  _id: string;
  name: string;
  images: string[];
}

interface CartItemType {
  _id: string;
  product: ProductType;
  amount: number;
  color: string;
  size: string;
  productcount: number;
  totalamount: number;
  refreshCart: () => void;
}

const Cart = () => {
  const [cartitems, setcartitems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalamount, settotalamount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getcartitem = async () => {
      try {
        const res = await getcart();
        settotalamount(res.data.TotalAmount);
        setcartitems(res.data.getcart);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getcartitem();
  }, []);

  const refreshCart = async () => {
    try {
      const res = await getcart();
      settotalamount(res.data.TotalAmount);
      setcartitems(res.data.getcart);
    } catch (err) {
      console.log(err);
    }
  };

  const promodiscount = 0;
  const Subtotal = totalamount + 40 - promodiscount;

  if (loading) return <CartLoading />;

  if (cartitems.length === 0) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center text-gray-500 text-center">
        <FaShoppingCart className="text-6xl mb-4" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-sm mt-1">Looks like you haven’t added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="w-screen sm:flex mb-66">
      {/* Cart Items */}
      <section className="sm:w-[70%] grid sm:grid-cols-2 grid-cols-1 gap-2 sm:p-6 p-2">
        {cartitems.map((data) => (
          <CartCard
            key={data._id}
            _id={data._id}
            productname={data.product.name}
            image={data.product.images[0]}
            amount={data.amount}
            color={data.color}
            size={data.size}
            productcount={data.productcount}
            refreshCart={refreshCart}
          />
        ))}
      </section>

      {/* Order Summary */}
      <section className="sm:w-[30%] bg-white shadow-md rounded-2xl sm:p-6 p-4 sm:my-5 h-fit">
        <h2 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h2>

        <div className="space-y-2 text-sm">
          <p className="flex justify-between text-gray-500">
            Total <span className="text-black font-medium">₹ {totalamount}</span>
          </p>
          <p className="flex justify-between text-gray-500">
            Discount <span className="text-red-500 font-medium">-₹ {promodiscount}</span>
          </p>
          <p className="flex justify-between text-gray-500">
            Delivery Fee <span className="text-black font-medium">₹ 40</span>
          </p>
        </div>

        <hr className="my-4" />

        <p className="flex justify-between font-semibold text-lg">
          Subtotal <span>₹ {Subtotal}</span>
        </p>

        {/* Promo Code */}
        <form className="mt-4 flex gap-2">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-full">
            <LuTag className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Add Promo code"
              className="flex-grow outline-none bg-transparent text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800"
          >
            Submit
          </button>
        </form>

        {/* Checkout Button */}
        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-6 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition"
        >
          Checkout <FaArrowRight />
        </button>
      </section>
    </div>
  );
};

export default Cart;
