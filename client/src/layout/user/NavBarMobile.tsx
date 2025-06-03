import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"
import RazoImg from '../../assets/razorpay_img.png'
const categories = [
    { data: "T-Shirts", Link: "t-shirts" },
    { data: "Shirts", Link: "shirts" },
    { data: "Jeans", Link: "jeans" },
    { data: "Trousers", Link: "trousers" },
    { data: "Innerwear", Link: "innerwear" },
    { data: "Footwear", Link: "footwear" },
    { data: "Accessories", Link: "accessories" },
    { data: "Top Selling", Link: "top-selling" },
    { data: "New Arrivals", Link: "new-arrivals" },
    { data: "Casual", Link: "casual" },
    { data: "Formal", Link: "formal" },
    { data: "Party", Link: "party" },
    { data: "Gymwear", Link: "gymwear" },
    { data: "Cotton", Link: "cotton" },
    { data: "Polyester", Link: "polyester" },
    { data: "Linen", Link: "linen" },
    { data: "Denim", Link: "denim" },
];

const NavBarMobile = () => {
    return (
        <div className='max-w-sm h-100dvh'>
            <section className="flex items-center justify-between w-full p-4">
                <p className="header-logo">FABRIQUE.CO</p>
                <p><IoClose className="text-3xl" /></p>
            </section>
            <section>
                <div className="border flex justify-center items-center p-1 m-2 rounded-full">
                    <input type="text" name="search" id="search" className="outline-none px-2"/>
                    <button className=" py-1 px-2 rounded-full bg-black text-white">Search</button>
                </div>
            </section>
            <section>
                <ul>
                    {
                        categories.map((info, index) => (
                            <li key={index} className="p-3">
                                <Link to={`/product/${info.Link}`}>
                                    <p className="text-xl">{info.data}</p>
                                </Link>
                            </li>

                        ))
                    }

                </ul>
            </section>
            <section className="w-full flex justify-between items-center border-t-1 px-5 text-gray-400 text-[12px]">
            <div>
              <p>FABRIQUE.CO © 2025 All Rights Reserved</p>
            </div>
            <div className="flex items-center">
              <p>Payment Partner</p>
            <img src={RazoImg} alt="imgpay" width={"120px"} />
            </div>
        </section>

        </div>
    )
}

export default NavBarMobile