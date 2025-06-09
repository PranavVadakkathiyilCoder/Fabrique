import { useState } from "react"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import ProductCard from "../../components/user/ProductCard"
import { useParams } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { useNavContext } from "../../context/NavContext"
const categories = [
    { data: "T-Shirts" },
    { data: "Shirts" },
    { data: "Jeans" },
    { data: "Trousers" },
    { data: "Innerwear" },
    { data: "Footwear" },
    { data: "Accessories" },

]
const selling = [
    { data: "Top Selling" },
    { data: "New Arrivals" },


]
const Occasion = [
    { data: "Casual" },
    { data: "Formal" },
    { data: "Party" },
    { data: "Gymwear" },
]
const Material = [
    { data: "Cotton" },
    { data: "Polyester" },
    { data: "Linen" },
    { data: "Denim" },
]

const AllProducts = () => {
    const [price, setPrice] = useState<string>("200")
    const product = useParams()
    console.log(product);
    const {filter,setfilter} = useNavContext()
    console.log(filter);
    
    

    return (
        <>
        <div>
            <section>
                <button onClick={()=>setfilter(!filter)} className={` ${filter ? "hidden":""} sm:hidden  m-1  px-4 py-2 rounded bg-black text-white flex items-center gap-4`}><GiHamburgerMenu/>Filter</button>
            </section>
            <section className="w-screen sm:flex  mt-1">
               
                <aside className={`sm:w-1/5 w-full sm:block  ${filter ? "":"hidden"}     px-3 my-2  flex-col  `}>
                    <div className="flex w-full gap-2 justify-evenly items-center">
                       
                        <button className=" px-6 py-2 rounded-md bg-black text-white">Clear</button>
                        <button className=" px-6 py-2 rounded-md bg-black text-white">Filter</button>
                        <p className="sm:hidden block   text-3xl"><IoClose onClick={()=>setfilter(!filter)}/></p>
                    </div>
                    <div className="w-full mt-1 text-center ">
                        <p className="">Rating</p>
                        <div className="flex items-center p-1 border border-gray-300 hover:bg-gray-50">
                            {[1, 2, 3, 4,5].map((star) => (
                            <FaStar key={star} className="text-yellow-300" />

                        ))}
                        
                        <p className="ml-1">5</p>
                        </div>
                    </div>
                    <div className="w-full mt-1  ">
                        <p className="text-center">Categories</p>
                       <div className="p-1 border border-gray-300">
                         {
                            categories.map((info, index) => (
                                <div key={index} className="flex gap-1">

                                    <input type="radio" value={info.data} id={info.data} name="categories" className="accent-black"/>
                                    <label htmlFor={info.data}>{info.data}</label>
                                </div>
                            ))
                        }
                       </div>

                    </div>
                   
                    <div className="w-full mt-1 ">
                        <p className="text-center">Price Range</p>
                        <div className="flex justify-evenly p-2 gap-3 border border-gray-300">
                            <input className="accent-black w-full" type="range" name="price" id="price" min={200} max={2000} step={10} value={price} onChange={(e) => setPrice(e.target.value)} />
                        <p>{price}</p>
                        </div>
                    </div>
                    <div className="w-full mt-1 p-1 border border-gray-300">

                        {
                            selling.map((info, index) => (
                                <div key={index} className="flex gap-1">

                                    <input type="radio" value={info.data} id={info.data} name="selling" className="accent-black"/>
                                    <label htmlFor={info.data}>{info.data}</label>
                                </div>
                            ))
                        }

                    </div>
                    <div className="w-full  mt-1 ">
                        <p className="text-center">Occasion</p>
                        <div className="p-2 border border-gray-300">
                            {
                            Occasion.map((info, index) => (
                                <div key={index} className="flex gap-1">

                                    <input type="radio" value={info.data} id={info.data} name="Occasion"className="accent-black"/>
                                    <label htmlFor={info.data}>{info.data}</label>
                                </div>
                            ))
                        }
                        </div>

                    </div>
                    <div className="w-full mt-1 ">
                        <p className="text-center">Material</p>
                       <div className="p-1 border border-gray-300">
                         {
                            Material.map((info, index) => (
                                <div key={index} className="flex gap-1">

                                    <input type="radio" value={info.data} id={info.data} name="Material" className="accent-black"/>
                                    <label htmlFor={info.data}>{info.data}</label>
                                </div>
                            ))
                        }
                       </div>

                    </div>
                </aside>
                <aside className="sm:w-4/5 w-full h-100dvh ">
                        <div className="grid sm:grid-cols-4 grid-cols-1 gap-3">
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>

                        </div>
                </aside>
            </section>
        </div>
            

        </>
    )
}

export default AllProducts