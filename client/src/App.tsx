import { Route, Routes } from 'react-router-dom'
import UserHome from './pages/user/UserHome'
import AllProducts from './pages/user/AllProducts'
import ProductView from './components/user/ProductView'
import Cart from './pages/user/Cart'
import NavBarMobile from './layout/user/NavBarMobile'
import CheckOut from './pages/user/CheckOut'
//import ProductCard from './components/user/ProductCard'
import OrdersList from './pages/user/Order'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UserHome/>}/>
      <Route path='/product/:category' element={<AllProducts/>}/>
      <Route path='/view' element={<ProductView/>}/>
      <Route path='/com' element={<NavBarMobile/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
      <Route path='/order' element={<OrdersList/>}/>
    </Routes>
  )
}

export default App