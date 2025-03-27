import { Link } from 'react-router'
import { TotalContext } from '../../context/TotalProvider'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

const Navbar = () => {
  const { total } = useContext(TotalContext)
  const { token, logout } = useContext(UserContext)

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand text-white' to='/'>
            Pizzería Mamma mia!
          </Link>

          {/* Botón del menú hamburguesa con clase personalizada para icono blanco */}
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <Link className='nav-link active text-white' aria-current='page' to='/'>
                  🍕Home
                </Link>
              </li>

              {token
                ? (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link text-white' to='/profile'>
                        🔓Profile
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <button onClick={logout} className='nav-link text-white border-0 bg-transparent'>
                        🔒Logout
                      </button>
                    </li>
                  </>
                  )
                : (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link text-white' to='/login'>
                        🔑Login
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link text-white' to='/register'>
                        📝Register
                      </Link>
                    </li>
                  </>
                  )}
            </ul>

            <Link to='/cart' className='navbar-text fw-bold text-primary border border-primary p-3'>
              🛒Total:{total.toLocaleString('ES')}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
