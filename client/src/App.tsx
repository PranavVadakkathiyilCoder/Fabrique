import { Route, Routes } from 'react-router-dom'
import UserHome from './pages/user/UserHome'
import AllProducts from './pages/user/AllProducts'
import ProductView from './components/user/ProductView'
import Cart from './pages/user/Cart'
//import ProductCard from './components/user/ProductCard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UserHome/>}/>
      <Route path='/products' element={<AllProducts/>}/>
      <Route path='/view' element={<ProductView/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  )
}

export default App