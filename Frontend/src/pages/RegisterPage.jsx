import { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSubmitR } = useContext(UserContext)

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-4 shadow-lg' style={{ width: '400px' }}>
        <h2 className='text-center mb-4'>Register</h2>
        <form onSubmit={(e) => handleSubmitR(e, email, password)}>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success w-100'>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
