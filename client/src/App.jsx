import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/User/PrivateRoute'

import Home from './pages/Home'
import Tour from './pages/Tour'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Error from './pages/Error'
import Account from './pages/Account'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Success from './pages/Success'

function App() {
  const { user } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/sign-in' element={user ? <Navigate to='/' /> : <Signin />} />
        <Route path='/sign-up' element={user ? <Navigate to='/' /> : <Signup />} />
        <Route path='/forgot-password' element={user ? <Navigate to='/' /> : <ForgotPassword />} />
        <Route path='/reset-password' element={user ? <Navigate to='/' /> : <ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path='/account' element={<Account />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/success' element={<Success />} />
        </Route>
        <Route path='/tour/:tourId' element={<Tour />} />
        <Route path='*' element={<Error error='Page Not Found' />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
