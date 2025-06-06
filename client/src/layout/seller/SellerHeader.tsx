import { FiSearch } from "react-icons/fi"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdContact } from "react-icons/io"
import { MdOutlineShoppingBag } from "react-icons/md"
import { Link } from "react-router-dom"

const navLinks = [
  { name: "Dashboard", path: "/store" },
  { name: "Product Management", path: "/manageproduct" },
  { name: "Orders", path: "/orders" },
  { name: "Reviews", path: "/reviews" },
  { name: "Chats", path: "/chats" },
];
const SellerHeader = () => {
  return (
    <nav className="w-100dvw">
          
          <section className="flex w-full items-center justify-evenly py-3 border-b-1">
            <p className="header-logo flex items-center gap-2">FABRIQUE.CO <span className="text-xl rounded-full px-1 bg-black text-white ">Seller</span></p>
            <ul className="sm:flex gap-5 sm hidden">
              {navLinks.map((link, index) => (
        <li key={index} className="cursor-pointer text-gray-600 hover:text-black transition">
          <Link to={link.path}>{link.name}</Link>
        </li>
      ))}
            </ul>
            
            <ul className="flex gap-4 items-center">
              <li className="flex relative"><MdOutlineShoppingBag className="text-2xl"/><span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {4}
        </span></li>
              <li><IoMdContact className="text-2xl"/></li>
            </ul>
          </section>
        </nav>
  )
}

export default SellerHeader