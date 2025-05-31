import shirt from '../../assets/shirt.png'

import { RiDeleteBinFill } from 'react-icons/ri'

const CartCard = () => {
  return (
     <div className="col-span-1 border border-gray-300  flex items-center justify-center p-2 gap-1 rounded-sm ">
                    <img src={shirt} alt="img" className="w-25 h-25 bg-gray-200 rounded-sm p-1" />
                    <div className="">
                        <div className="flex  gap-2">
                            <p className="font-medium">ONE LIFE GRAPHIC T SHIRT </p>
                           <RiDeleteBinFill className="text-red-500 text-2xl"/>

                        </div>
                        <p>Size : <span className="text-gray-400">Large</span></p>
                        <p>Color : <span className="text-gray-400">Red</span></p>
                        <div className="flex justify-between">
                            <p>Price</p>
                            <div className="flex ">
                                <button className=" bg-gray-200 px-3 rounded-l-xl">-</button>
                                <p className=" px-3 bg-gray-200">{1}</p>
                                <button className=" bg-gray-200 px-3 rounded-r-xl">+</button>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default CartCard