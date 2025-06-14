import CartCard from "../../components/user/CartCard"
import { LuTag } from "react-icons/lu"
import { FaArrowRight } from "react-icons/fa"
import { useEffect, useState } from "react"
import { getcart } from "../../apis/cartapi"
import { useNavigate } from "react-router-dom"
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
  const [totalamount, settotalamount] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    const getcartitem = async () => {
      try {
        const res = await getcart();
        console.log(res.data);
        settotalamount(res.data.TotalAmount)

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
  const promodiscount = 0
  const Subtotal = totalamount + 40 - promodiscount

  return (
    <div className="w-screen sm:flex mb-66">
      {/* Cart Items */}
      <section className="sm:w-[70%]  grid sm:grid-cols-2 grid-cols-1 gap-2 sm:p-6 p-2">
        {loading
          ? Array(4).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse flex gap-4 border border-gray-200 rounded-xl p-4 ">
              <div className="w-24 h-24 bg-gray-200 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))
          : cartitems.map((data) => (
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
        {loading ? (
          <div className="animate-pulse space-y-5">
            <div className="h-6 bg-gray-300 w-1/2 rounded" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
              <div className="h-4 bg-gray-300 rounded w-4/6" />
            </div>
            <div className="h-px bg-gray-300 mx-5" />
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-5" />
            <div className="h-10 bg-gray-300 rounded-full w-full mt-5" />
            <div className="h-10 bg-gray-300 rounded-full w-full mt-3" />
          </div>
        ) : (
          <>
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
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition"
            >
              Checkout <FaArrowRight />
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default Cart;
