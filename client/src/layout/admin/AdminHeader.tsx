import { IoMdContact } from "react-icons/io"
import { MdOutlineShoppingBag } from "react-icons/md"
import { Link } from "react-router-dom"

const navLinks = [
  { name: "Dashboard", path: "/admin" },
  { name: "Product Management", path: "/manage_product" },
  { name: "Seller Management", path: "/manage_seller" },
  { name: "User Management", path: "/manage_user" },
  
];
const AdminHeader = () => {
  return (
    <nav className="w-100dvw">

      <section className="flex w-full items-center justify-evenly py-3 border-b-1">
        <p className="header-logo flex items-center gap-2">FABRIQUE.CO <span className="text-xl rounded-full px-3 bg-black text-white ">Admin</span></p>
        <ul className="sm:flex gap-5 sm hidden">
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer text-gray-600 hover:text-black transition">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-4 items-center">
          
          <li><IoMdContact className="text-2xl" /></li>
        </ul>
      </section>
    </nav>
  )
}

export default AdminHeader