import { Route, Routes } from 'react-router-dom'
import UserNav from './layout/user/UserNav'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UserNav/>}/>
    </Routes>
  )
}

export default App