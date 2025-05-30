import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdContact } from "react-icons/io"
import { MdOutlineShoppingBag } from "react-icons/md"
import { Link } from "react-router-dom";
 
const navLinks = [
  { name: "Home", path: "/" },
  { name: "New Arrivals", path: "/new" },
  { name: "Top Sellings", path: "/top-sellings" },
  { name: "Accessories", path: "/accessories" },
];

const UserNav = () => {

  return (
    <nav className="w-100dvw">
      <section className=" sm:text-[14px] text-[12px]  w-full bg-black text-gray-400 text-center">
        <p>India's Fastest Online Shopping Destination <span className="text-gray-300 underline hover:text-gray-400">Shop Now</span></p>
      </section>
      <section className="flex w-full items-center justify-evenly py-3 border-b-1">
        <p className="sm:hidden block"><GiHamburgerMenu className="text-2xl"/></p>
        <p className="header-logo">FABRIQUE.CO</p>
        <ul className="sm:flex gap-5 sm hidden">
          {navLinks.map((link, index) => (
    <li key={index} className="cursor-pointer text-gray-600 hover:text-black transition">
      <Link to={link.path}>{link.name}</Link>
    </li>
  ))}
        </ul>
        <div className="sm:flex hidden items-center justify-between border px-6 h-10 w-96 rounded-full bg-gray-100">
          <input type="text" placeholder="Get your Fashion Now " className="outline-none " />
          <FiSearch className="text-3xl"/>
          
        </div>
        <ul className="flex gap-4 items-center">
          <li><FiSearch className="text-2xl sm:hidden "/></li>
          <li className="flex relative"><MdOutlineShoppingBag className="text-2xl"/><span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {4}
    </span></li>
          <li><IoMdContact className="text-2xl"/></li>
        </ul>
      </section>
    </nav>
  )
}

export default UserNav