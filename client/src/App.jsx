import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Tour from './pages/Tour'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour/:tourId" element={<Tour />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
