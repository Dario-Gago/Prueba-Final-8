import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

const PublicRoute = () => {
  const { token } = useContext(UserContext)
  return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoute
