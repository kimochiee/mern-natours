import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function PrivateRoute() {
  const { user } = useContext(UserContext)

  return user ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute