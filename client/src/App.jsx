import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Tour from './pages/Tour'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Error from './pages/Error'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/tour/:tourId" element={<Tour />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
