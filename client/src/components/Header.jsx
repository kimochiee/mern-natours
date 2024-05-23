import { Link, useNavigate } from 'react-router-dom'
import { notify } from '../utils/notify'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import env from '../config/env'

function Header() {
  const navigate = useNavigate()
  const { user, setUser, setUserReady } = useContext(UserContext)

  const handleLogOut = async () => {
    try {
      const res = await fetch(`${env.API_ROOT}/api/v1/users/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')
      }

      if (data.status === 'success') {
        notify('Log out successful', 'success')

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setUserReady(false)

        navigate('/')
      }
    } catch (error) {
      notify(error.message, 'error')
      console.log(error.message)
    }
  }

  return (
    <header className='header'>
      <nav className='nav nav--tours'>
        <Link to='/' className='nav__el'>All tours</Link>
        <form className='nav__search'>
          <button className='nav__search-btn'>
            <svg>
              <use xlinkHref='img/icons.svg#icon-search'></use>
            </svg>
          </button>
          <input
            type='text'
            placeholder='Search tours'
            className='nav__search-input'
          />
        </form>
      </nav>
      <div className='header__logo'>
        <img src='img/logo-white.png' alt='Natours logo' />
      </div>
      <nav className='nav nav--user'>
        {user ? (
          <>
            <Link className='nav__el nav__el-logout' onClick={handleLogOut}>Log Out</Link>
            <Link to='/account?tab=profile' className='nav__el'>
              <img
                src={user.photo.startsWith('http') ? user.photo : `img/users/${user.photo}`}
                alt='User photo'
                className='nav__user-img'
              />
              <span>{user.name}</span>
            </Link>
          </>
        ) : (
          <>
            <Link className='nav__el' to='/sign-in'>Sign in</Link>
            <Link className='nav__el nav__el--cta' to='/sign-up'>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header