import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    })
  }

  const handleSubmitL = async (e, email, password) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    if (data.error) {
      showAlert('Error', data.error, 'error')
    } else {
      showAlert('Success', 'Authentication successful!', 'success')
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', email)
      setToken(data.token)
      getProfile(data.token)
    }
  }

  const handleSubmitR = async (e, email, password) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    if (data.error) {
      showAlert('Error', data.error, 'error')
    } else {
      showAlert('Success', 'Registration successful!', 'success')
    }
  }

  const getProfile = async (authToken = token) => {
    if (!authToken) return

    const response = await fetch('http://localhost:5000/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    if (data.error) {
      showAlert('Error', 'Error fetching profile', 'error')
      return
    }
    setUser(data)
  }

  useEffect(() => {
    if (token) {
      getProfile()
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <UserContext.Provider value={{ token, user, logout, handleSubmitL, handleSubmitR, getProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
