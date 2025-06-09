import { Route, Routes } from 'react-router-dom'
import UserHome from './pages/user/UserHome'
import AllProducts from './pages/user/AllProducts'
import ProductView from './pages/user/ProductView'
import Cart from './pages/user/Cart'
import NavBarMobile from './layout/user/NavUserMobile'
import CheckOut from './pages/user/CheckOut'
//import ProductCard from './components/user/ProductCard'
import OrdersList from './pages/user/Order'
import StoreHome from './pages/seller/StoreHome'
import ProductManage from './pages/seller/ProductManage'
import Order from './pages/seller/Orders'
import Reviews from './pages/seller/Reviews'
import Chats from './pages/seller/Chats'
import SellerHeader from './layout/seller/SellerHeader'
import AdminHome from './pages/admin/AdminHome'
import AdminHeader from './layout/admin/AdminHeader'
import Products from './pages/admin/Products'
import Users from './pages/admin/Users'
import Sellers from './pages/admin/Sellers'
import AllReviews from './pages/admin/AllReviews'
import UserNav from './layout/user/UserNav'
import NavSellerMobile from './layout/seller/NavSellerMobile'
import NavAdminMobile from './layout/admin/NavAdminMobile'
const App = () => {
  return (
    <>
      <UserNav/>
      {/*<SellerHeader/>*/}
      {/*<AdminHeader/>*/}
      <NavBarMobile/>
      <NavSellerMobile/>
      <NavAdminMobile/>
      <Routes>
        
        <Route path='/' element={<UserHome/>}/>
      <Route path='/product/:category' element={<AllProducts/>}/>
      <Route path='/view' element={<ProductView/>}/>
      
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
      <Route path='/order' element={<OrdersList/>}/>

        {/*<Route path='/store' element={<StoreHome/>}/>
      <Route path='/manageproduct' element={<ProductManage/>}/>
      <Route path='/orders' element={<Order/>}/>
      <Route path='/reviews' element={<Reviews/>}/>
      <Route path='/chats' element={<Chats/>}/>*/}
        {/*<Route path='/admin' element={<AdminHome />} />
        <Route path='/manage_product' element={<Products/>} />
        <Route path='/manage_user' element={<Users />} />
        <Route path='/manage_seller' element={<Sellers />} />
        <Route path='/reviews/:_id' element={<AllReviews/>} />*/}



      </Routes>
    </>

  )
}

export default App