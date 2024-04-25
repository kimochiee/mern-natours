import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutSuccess } from '../redux/user/userSlice'
import { notify } from '../utils/notify'
import env from '../config/env'

function Header() {
  const { currentNatoursUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
        dispatch(logOutSuccess())
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
        {currentNatoursUser ? (
          <>
            <Link className='nav__el nav__el-logout' onClick={handleLogOut}>Log Out</Link>
            <Link to='/account?tab=profile' className='nav__el'>
              <img
                src={currentNatoursUser.photo.startsWith('http') ? currentNatoursUser.photo : `img/users/${currentNatoursUser.photo}`}
                alt='User photo'
                className='nav__user-img'
              />
              <span>{currentNatoursUser.name}</span>
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