import { RiDeleteBinFill } from "react-icons/ri"
import shirt from '../../assets/shirt.png'
import CartCard from "../../components/user/CartCard"
import { LuTag } from "react-icons/lu"
import { FaArrowRight } from "react-icons/fa"



const Cart = () => {
    return (
        <div className="w-screen sm:flex">

            <section className=" sm:w-[70%]  grid sm:grid-cols-2 grid-cols-1 gap-2 sm:p-6 p-2">


                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />


            </section>
            <section className=" sm:w-[30%] sm:p-6 p-3">

                <p className="text-2xl">ORDER SUMMERY</p>

                <div className="p-5">
                    <p className="flex justify-between items-center text-gray-400">Subtotal <span className="text-black sm:text-[1.1rem]">$3000</span></p>
                    <p className="flex justify-between items-center text-gray-400">Discount <span className="text-red-500 sm:text-[1.1rem]">-$3000</span></p>
                    <p className="flex justify-between items-center text-gray-400">Delivery Fee <span className="text-black sm:text-[1.1rem]">$3000</span></p>
                </div>
                <hr className="h-px  mx-5 bg-gray-200 border-0 dark:bg-gray-300" />
                <p className="flex justify-between items-center p-5 text-gray-700">Total <span className="text-black sm:text-[1.1rem]">$3000</span></p>
                <form action="" className="  flex">
                    
                    <div className="flex items-center border rounded-full px-3 ">
                        <label htmlFor=""><LuTag className="text-gray-500" /></label>
                        <input type="text" placeholder="  Add Promo code" className="outline-none w-40"/>
                    </div>
                    <button className=" px-4 py-2 rounded-full bg-black text-white ml-1">Submit</button>
                        
                </form>
                <button className="w-full flex justify-center items-center gap-4 mt-5 px-4 py-2 rounded-full bg-black text-white ">Checkout <span><FaArrowRight /></span></button>

            </section>
        </div>
    )
}

export default Cart