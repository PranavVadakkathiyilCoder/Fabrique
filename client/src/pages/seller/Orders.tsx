import shirt from '../../assets/shirt.png'

const Order = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="sm:w-screen min-h-screen  ">

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center sm:gap-6 transition hover:shadow-lg">

            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0">
              <img src={shirt} alt="Product" className="w-full h-full object-cover rounded-md" />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-lg font-semibold mb-1 text-gray-900">The shirt the better shirt</p>
              <div className="text-sm text-gray-600 leading-relaxed space-y-1">
                <p>Size: <span className="font-medium text-black">Large</span></p>
                <p>Qty: <span className="font-medium text-black">5</span></p>
                <p>Color: <span className="font-medium text-black">Red</span></p>
                <p>Payment: <span className="font-medium text-black">Cash on Delivery</span></p>
              </div>
            </div>

            {/* Address and Status together in a column */}
            <div className="flex flex-col gap-3 w-full sm:w-1/3 justify-center">

              {/* Shipping Address */}
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1 text-gray-800">Shipping Address:</p>
                <p>John Doe</p>
                <p>123, MG Road</p>
                <p>Bangalore, Karnataka</p>
                <p>PIN: 560001</p>
                <p>📞 +91-9876543210</p>
              </div>

              {/* Order Status */}
              <div className="">
                <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  id="orderStatus"
                  name="orderStatus"
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="pending">Pending</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="intransit">In Transit</option>
                  <option value="outForDelivery">Out for Delivery</option>
                </select>
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  )
}

export default Order
