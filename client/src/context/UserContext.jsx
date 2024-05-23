import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { notify } from '../utils/notify'
import { jwtDecode } from 'jwt-decode'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const [token, setToken] = useState(() => localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null)
  const [userReady, setUserReady] = useState(false)

  const isTokenExpired = () => {
    const currentTime = Math.floor(Date.now() / 1000)

    if (!token || !token.exp || token?.exp < currentTime) {
      setUser(null)
      setUserReady(false)
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      notify('Session expired. Please sign in again', 'error')
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, userReady, setUserReady, token, setToken, isTokenExpired }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
