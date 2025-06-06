import { Route, Routes } from 'react-router-dom'
import UserHome from './pages/user/UserHome'
import AllProducts from './pages/user/AllProducts'
import ProductView from './pages/user/ProductView'
import Cart from './pages/user/Cart'
import NavBarMobile from './layout/user/NavBarMobile'
import CheckOut from './pages/user/CheckOut'
//import ProductCard from './components/user/ProductCard'
import OrdersList from './pages/user/Order'
import StoreHome from './pages/seller/StoreHome'
import ProductManage from './pages/seller/ProductManage'
import Order from './pages/seller/Orders'
import Reviews from './pages/seller/Reviews'
import Chats from './pages/seller/Chats'
import SellerHeader from './layout/seller/SellerHeader'
const App = () => {
  return (
    <>
    <SellerHeader/>
    <Routes>
      {/*<Route path='/' element={<UserHome/>}/>
      <Route path='/product/:category' element={<AllProducts/>}/>
      <Route path='/view' element={<ProductView/>}/>
      <Route path='/com' element={<NavBarMobile/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
      <Route path='/order' element={<OrdersList/>}/>*/}
      
      <Route path='/store' element={<StoreHome/>}/>
      <Route path='/manageproduct' element={<ProductManage/>}/>
      <Route path='/orders' element={<Order/>}/>
      <Route path='/reviews' element={<Reviews/>}/>
      <Route path='/chats' element={<Chats/>}/>


    </Routes>
    </>
    
  )
}

export default App