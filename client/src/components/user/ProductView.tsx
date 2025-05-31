import { FaStar, FaStarHalfAlt } from "react-icons/fa"
//import CustomerReview from "./CustomerReview"
//import ReviewCard from "./ReviewCard"
//import TopSelling from "./TopSelling"

function ProductView() {
    return (
        <div className="w-screen">
        
            <section className="w-screen h-screen  sm:p-12 p-2 sm:flex gap-4">
                
                    <aside className="sm:w-2/6 border sm:h-full h-[420px]">
                    <div className="w-full h-4/5 border ">

                    </div>
                    <div className="w-full h-1/5 border grid grid-cols-4">
                        <div className="col-span-1 border">

                        </div>
                        <div className="col-span-1 border">

                        </div>
                        <div className="col-span-1 border">

                        </div>
                        <div className="col-span-1 border">

                        </div>
                    </div>
                </aside>
                <aside className="sm:w-4/6 border p-7">
                    <p className="text-4xl">ONE LIFE GRAPHIC T SHIRT</p>

                    <div className="flex items-center p-1 text-xl">
                        {[1, 2, 3, 4].map((star) => (
                            <FaStar key={star} className="text-yellow-300" />

                        ))}
                        <FaStarHalfAlt className="text-yellow-300" />
                        <p className="ml-1">4.5</p>
                    </div>

                    <p className='text-3xl flex items-center'><span className='mr-3 '> $ 450</span><span className='mr-3 text-gray-400 line-through'>$500</span><span className='text-sm text-red-600 border p-1  rounded-xl bg-red-200'>10% off</span> </p>
                    <p className="font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe natus deleniti tempora eos laborum eligendi porro repudiandae! Soluta, numquam fugiat. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum eum voluptas nihil enim ab laboriosam rerum doloribus in reprehenderit consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum et eligendi esse veniam eaque, soluta, illum sapiente, pariatur quae vel facilis! Aspernatur, ipsam ratione autem rerum odio quibusdam esse voluptates consequuntur ipsa mollitia temporibus rem itaque laudantium, quidem eius?</p>
                    <hr className="h-px my-1 mx-5 bg-gray-200 border-0 dark:bg-gray-300" />
                    <p className="font-medium">Select Color</p>
                    <div className="flex gap-3 p-3">
                        <p className="w-15 h-15 border"></p>
                        <p className="w-15 h-15 border"></p>
                        <p className="w-15 h-15 border"></p>
                        <p className="w-15 h-15 border"></p>
                    </div>
                    <hr className="h-px  mx-5 bg-gray-200 border-0 dark:bg-gray-300" />
                    <p className="font-medium">Select Size</p>
                    <div className="flex gap-3 p-3 ">
                        <p className="px-4 py-2 border rounded-sm">S</p>
                        <p className="px-4 py-2 border rounded-sm">M</p>
                        <p className="px-4 py-2 border rounded-sm">L</p>
                        <p className="px-4 py-2 border rounded-sm">XL</p>
                    </div>
                    <hr className="h-px my-1 mx-5 bg-gray-200 border-0 dark:bg-gray-300" />
                    <div className="sm:flex items-center justify-evenly w-full p-6 gap-6">
                        <div className="flex sm:w-1/3">
                            <button className="bg-gray-300  px-6 py-2  rounded-l-xl w-full">-</button>
                            <p className="bg-gray-300 px-5 py-2  w-full text-center">{1}</p>
                            <button className="bg-gray-300  px-6 py-2  rounded-r-xl w-full">+</button>
                        </div>
                        <div className="sm:w-2/3">

                            <button className="px-4 py-2 bg-black text-white w-full rounded-xl mt-2 sm:mt-0">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </aside>
                
                
            </section>
            
            
        </div>
    )
}

export default ProductView
