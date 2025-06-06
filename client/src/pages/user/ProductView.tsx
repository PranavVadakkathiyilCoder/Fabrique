import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import CustomerReview from "../../components/user/CustomerReview";
import ReviewCard from "../../components/ReviewCard";
import TopSelling from "../../components/user/TopSelling";
import NewArrivels from "../../components/user/NewArrivels";

function ProductView() {
    return (
        <div className="w-screen">
            <section className="w-full sm:p-12 p-2 sm:flex  gap-4">
                {/* Image section */}
                <aside className="sm:w-2/6 h-100 sm:h-130 w-full border ">
                    <div className="w-full h-4/5 border"></div>
                    <div className="w-full h-1/5 border grid grid-cols-4">
                        <div className="col-span-1 border"></div>
                        <div className="col-span-1 border"></div>
                        <div className="col-span-1 border"></div>
                        <div className="col-span-1 border"></div>
                    </div>
                </aside>

                {/* Product details */}
                <aside className="sm:w-4/6 w-full border p-4 sm:p-7">
                    <p className="text-2xl sm:text-4xl font-semibold">ONE LIFE GRAPHIC T SHIRT</p>

                    <div className="flex items-center py-2 text-lg sm:text-xl">
                        {[1, 2, 3, 4].map((star) => (
                            <FaStar key={star} className="text-yellow-300" />
                        ))}
                        <FaStarHalfAlt className="text-yellow-300" />
                        <p className="ml-1">4.5</p>
                    </div>

                    <p className="text-xl sm:text-3xl flex items-center flex-wrap gap-2">
                        <span className="text-black font-bold">$450</span>
                        <span className="text-gray-400 line-through">$500</span>
                        <span className="text-sm text-red-600 border px-2 py-1 rounded-xl bg-red-200">10% off</span>
                    </p>

                    <p className="mt-2 font-medium text-sm sm:text-base">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe natus deleniti tempora eos laborum...
                    </p>

                    <hr className="my-3 bg-gray-300" />

                    {/* Color Selector */}
                    <p className="font-medium">Select Color</p>
                    <div className="flex gap-3 py-2">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="w-8 h-8 border rounded-full"></div>
                        ))}
                    </div>

                    <hr className="my-3 bg-gray-300" />

                    {/* Size Selector */}
                    <p className="font-medium">Select Size</p>
                    <div className="flex gap-3 py-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                            <p key={size} className="px-4 py-2 border rounded-sm">{size}</p>
                        ))}
                    </div>

                    <hr className="my-3 bg-gray-300" />

                    {/* Quantity and Cart */}
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full py-4 gap-4">
                        <div className="flex w-full sm:w-1/3">
                            <button className="bg-gray-300 px-4 py-2 rounded-l-xl w-1/3">-</button>
                            <p className="bg-gray-300 px-4 py-2 text-center w-1/3">1</p>
                            <button className="bg-gray-300 px-4 py-2 rounded-r-xl w-1/3">+</button>
                        </div>
                        <button className="w-full sm:w-2/3 px-4 py-2 bg-black text-white rounded-xl">
                            Add to Cart
                        </button>
                    </div>
                </aside>
            </section>

            {/* Reviews Section */}
            <section className="w-full px-4 sm:px-12 py-8">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4">
                    <ReviewCard />
                   
                </div>
            </section>

            {/* Additional Sections */}
            <NewArrivels />
            <TopSelling />
            
        </div>
    );
}

export default ProductView;
