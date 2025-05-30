import { Route, Routes } from 'react-router-dom'
//import UserHome from './pages/user/UserHome'
import ProductCard from './components/user/ProductCard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ProductCard/>}/>

    </Routes>
  )
}

export default App