import { FaStar } from "react-icons/fa"
import { MdVerified } from "react-icons/md"


const ReviewCard = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Chats</h2>

     <div className=' col-span-1  max-w-sm max-h-[320px]  border border-gray-300  flex-col  rounded-xl inline-block sm:inline-flex sm:m-5 m-1'>
                    <div className="p-3">
                    <FaStar className="text-yellow-300 text-xl"/>
                    <p className="flex items-center gap-3 font-semibold">Pranav V <span><MdVerified className="text-blue-500"/> </span></p>
                    <p className="line-clamp-3">Lorem ipsum Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, repudiandae. lorem10</p>
                    </div>
                </div>
                 <div className=' col-span-1  max-w-sm max-h-[320px]  border border-gray-300  flex-col  rounded-xl inline-block sm:inline-flex sm:m-5 m-1'>
                    <div className="p-3">
                    <FaStar className="text-yellow-300 text-xl"/>
                    <p className="flex items-center gap-3 font-semibold">Pranav V <span><MdVerified className="text-blue-500"/> </span></p>
                    <p className="line-clamp-3">Lorem ipsum Lorem, ipsum dol</p>
                    </div>
                </div>
                <div className=' col-span-1  max-w-sm max-h-[320px]  border border-gray-300  flex-col  rounded-xl inline-block sm:inline-flex sm:m-5 m-1'>
                    <div className="p-3">
                    <FaStar className="text-yellow-300 text-xl"/>
                    <p className="flex items-center gap-3 font-semibold">Pranav V <span><MdVerified className="text-blue-500"/> </span></p>
                    <p className="line-clamp-3">Lorem ipsum Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, repudiandae. lorem10</p>
                    </div>
                </div>
                 <div className=' col-span-1  max-w-sm max-h-[320px]  border border-gray-300  flex-col  rounded-xl inline-block sm:inline-flex sm:m-5 m-1'>
                    <div className="p-3">
                    <FaStar className="text-yellow-300 text-xl"/>
                    <p className="flex items-center gap-3 font-semibold">Pranav V <span><MdVerified className="text-blue-500"/> </span></p>
                    <p className="line-clamp-3">Lorem ipsum Lorem, ipsum dol</p>
                    </div>
                </div>
               
                
    </div>
  )
}

export default ReviewCard