import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { IconMenu } from '../Icons'
import Magnetic from '../fx/Magnetic'
import { CONTATO } from '../../data/contato'

const links = [
  { to: '/residencias', label: 'Residências' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
]

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="MONOLITO, página inicial">
      <span className="brand-bar" />
      <span className="brand-name">MONOLITO</span>
    </Link>
  )
}

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`site-nav ${solid ? 'solid' : ''}`}>
      <nav className="wrap nav-inner" aria-label="Principal">
        <Brand />
        <div className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-cta">
          <Magnetic>
            <Link to="/contato" className="btn-line gold-border btn-sm-44">Agendar visita</Link>
          </Magnetic>
        </div>
        <button type="button" className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}>
          <IconMenu size={22} />
        </button>
      </nav>

      <Offcanvas show={open} onHide={() => setOpen(false)} placement="end" className="offcanvas-dark">
        <Offcanvas.Header closeButton closeLabel="Fechar menu">
          <Offcanvas.Title as="div"><Brand /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <div className="offcanvas-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Início</NavLink>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="pt-4">
            <Link to="/contato" className="btn-gold w-100">Agendar visita</Link>
            <p className="muted mt-3 mb-0" style={{ fontSize: 14 }}>{CONTATO.telefone}<br />{CONTATO.email}</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  )
}
