import { RiDeleteBinFill } from 'react-icons/ri'
import { deleteitemcart } from '../../apis/cartapi';
import { useEffect } from 'react';

interface CartCardProps {
  _id: string;
  productname: string;
  image: string;
  amount: number;
  color: string;
  size: string;
  productcount: number;
  refreshCart: () => void;

}

const CartCard: React.FC<CartCardProps> = ({
  _id,
  productname,
  image,
  amount,
  color,
  size,
  productcount,
  refreshCart,
  
}) => {


    const DeleteCartItem = async(_id:string)=>{
    try {
        const res = await deleteitemcart(_id)
        console.log(res.data);
        refreshCart()
        
    } catch (error) {
        console.log("Error on cart delete",error);
        
    }
      
}
  return (
    <div className="flex items-center h-[150px] w-full gap-4 border border-gray-200 rounded-sm p-4 shadow-sm bg-white hover:shadow-md transition-all duration-200">
      <img
        src={image}
        alt={productname}
        className="w-24  h-24 object-cover rounded-md bg-gray-100"
      />

      <div className="flex flex-col justify-between w-full">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">{productname}</h2>
            <p className="text-sm text-gray-500">Size: <span className="text-gray-700">{size.toUpperCase()}</span></p>
            <p className="text-sm text-gray-500">Color: <span className="text-gray-700 capitalize">{color}</span></p>
          </div>

          <button onClick={()=>DeleteCartItem(_id)}>
            <RiDeleteBinFill className="text-red-500 text-xl hover:text-red-600" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-medium">₹ {amount}</p>

          <div className="flex items-center  border border-gray-300 rounded-full overflow-hidden">
            
            <span className="px-4 py-1 text-sm  font-medium bg-white"><span className="text-gray-700">Qty : </span>{productcount}</span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
