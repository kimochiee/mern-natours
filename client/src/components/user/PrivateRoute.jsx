import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
  const { currentNatoursUser } = useSelector((state) => state.user)

  return currentNatoursUser ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute