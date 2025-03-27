import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'
import Profile from './pages/Profile'
import TotalProvider from './context/TotalProvider'
import Pizza from './components/Pizza/Pizza'
import UserProvider from './context/UserProvider'
import PublicRoute from './components/PublicRoute/PublicRoute' // Importamos PublicRoute

const App = () => {
  return (
    <div className='app'>
      <UserProvider>
        <TotalProvider>
          <Navbar />
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route element={<PublicRoute />}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
              </Route>
              <Route path='/cart' element={<Cart />} />
              <Route path='/pizza/:id' element={<Pizza />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/404' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </TotalProvider>
      </UserProvider>
    </div>
  )
}

export default App
