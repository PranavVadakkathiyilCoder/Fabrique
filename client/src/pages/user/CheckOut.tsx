import { FaArrowRight } from "react-icons/fa";
import { LuTag } from "react-icons/lu";

const Order = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-10 flex flex-col sm:flex-row gap-6">
      
      {/* Left Side - Address & Payment */}
      <div className="flex flex-col sm:w-2/3 gap-6">
        
        {/* Address Section */}
        <section className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">1. Add Address to Deliver</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Address</label>
              <textarea
                placeholder="Enter your address"
                className="border border-gray-300 rounded-md px-3 py-2 min-h-[100px] outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Pincode</label>
              <input
                type="number"
                placeholder="Enter Pincode"
                className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </form>
        </section>

        {/* Payment Section */}
        <section className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">2. Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" className="accent-black" />
              CASH ON DELIVERY
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" className="accent-black" />
              ONLINE PAYMENT
            </label>
          </div>
        </section>
      </div>

      {/* Right Side - Order Summary */}
      <div className="sm:w-1/3 bg-white shadow-md rounded-2xl p-6 h-fit">
        <h2 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h2>
        
        <div className="space-y-2 text-sm">
          <p className="flex justify-between text-gray-500">
            Subtotal <span className="text-black font-medium">$3000</span>
          </p>
          <p className="flex justify-between text-gray-500">
            Discount <span className="text-red-500 font-medium">- $3000</span>
          </p>
          <p className="flex justify-between text-gray-500">
            Delivery Fee <span className="text-black font-medium">$50</span>
          </p>
        </div>

        <hr className="my-4" />

        <p className="flex justify-between font-semibold text-lg">
          Total <span>$50</span>
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
        <button className="w-full mt-6 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition">
          Checkout <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Order;
