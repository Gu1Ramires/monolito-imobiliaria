import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import { startLenis, stopLenis } from './components/layout/SmoothScroll'
import Home from './pages/Home'
import Residencias from './pages/Residencias'
import ResidenciaDetalhe from './pages/ResidenciaDetalhe'
import Destinos from './pages/Destinos'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    startLenis()
    return () => stopLenis()
  }, [])

  return (
    <>
      <a href="#conteudo" className="visually-hidden-focusable btn-gold" style={{ position: 'fixed', top: 8, left: 8, zIndex: 3000 }}>
        Pular para o conteúdo
      </a>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition title="Residências de exceção"><Home /></PageTransition>} />
          <Route path="/residencias" element={<PageTransition title="Residências"><Residencias /></PageTransition>} />
          <Route path="/residencias/:slug" element={<PageTransition><ResidenciaDetalhe /></PageTransition>} />
          <Route path="/destinos" element={<PageTransition title="Destinos"><Destinos /></PageTransition>} />
          <Route path="/sobre" element={<PageTransition title="Sobre"><Sobre /></PageTransition>} />
          <Route path="/contato" element={<PageTransition title="Contato"><Contato /></PageTransition>} />
          <Route path="*" element={<PageTransition title="Página não encontrada"><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
