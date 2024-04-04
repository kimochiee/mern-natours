import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOutSuccess } from "../redux/user/userSlice"
import { notify } from "../utils/notify"

function Header() {
  const { currentNatoursUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/users/logout', {
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
      console.log(error.message)
    }
  }

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a href="/" className="nav__el">All tours</a>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref="img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src="img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {currentNatoursUser ? (
          <>
            <a className="nav__el nav__el-logout" onClick={handleLogOut}>Log Out</a>
            <a href="#" className="nav__el">
              <img src={`img/users/${currentNatoursUser.photo}`} alt="User photo" className="nav__user-img" />
              <span>{currentNatoursUser.name}</span>
            </a>
          </>
        ) : (
          <>
            <a className="nav__el" href="/sign-in">Sign in</a>
            <a className="nav__el nav__el--cta" href="/sign-up">Sign up</a>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header