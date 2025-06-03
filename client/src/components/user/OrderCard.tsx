import { BsFillChatDotsFill } from "react-icons/bs";
import shirt from '../../assets/shirt.png'

const OrderCard = () => {
  return (
    <div className="  col-span-1 flex flex-col sm:flex-row bg-white border border-gray-200 shadow-sm rounded-xl p-4 w-full max-w-[380px] min-h-[170px] items-center">
      {/* Image */}
      <div className=" w-28 h-28 rounded-lg overflow-hidden mb-2 sm:mb-0 sm:mr-4 ">
        <img
          src={shirt}
          alt="Product"
          className="w-full h-full"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Black Cotton T-Shirt</h3>
          <p className="text-sm text-gray-500 mt-1">
            Color: <span className="text-gray-700">Black</span> | Size: <span className="text-gray-700">L</span>
          </p>
        </div>

        <div className="flex justify-between gap-3 items-center mt-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-green-600 font-medium">Delivered</span>
          </div>

          {/* Chat */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition">
            <BsFillChatDotsFill className="text-sm" />
            Chat Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
