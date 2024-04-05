import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/User/PrivateRoute'

import Home from './pages/Home'
import Tour from './pages/Tour'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Error from './pages/Error'
import Account from './pages/Account'

function App() {
  const { currentnatoursUser } = useSelector((state) => state.user)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={currentnatoursUser ? <Navigate to='/' /> : <Signin />} />
        <Route path='/sign-up' element={currentnatoursUser ? <Navigate to='/' /> : <Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/account' element={<Account />} />
        </Route>
        <Route path='/tour/:tourId' element={<Tour />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
