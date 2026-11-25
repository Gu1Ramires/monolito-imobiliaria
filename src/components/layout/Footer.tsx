import { Link } from 'react-router-dom'
import { CONTATO } from '../../data/contato'

export default function Footer() {
  return (
    <footer className="wrap" style={{ paddingTop: 80, paddingBottom: 48 }}>
      <div className="d-flex justify-content-between flex-wrap" style={{ gap: 48, paddingBottom: 56, borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 320 }}>
          <Link to="/" className="brand" style={{ marginBottom: 18 }} aria-label="MONOLITO, página inicial">
            <span className="brand-bar" style={{ width: 10, height: 26 }} />
            <span className="brand-name" style={{ fontSize: 22 }}>MONOLITO</span>
          </Link>
          <p className="muted mb-0" style={{ fontSize: 14, lineHeight: 1.7 }}>
            Residências de exceção em sete destinos do Brasil. Projeto fictício para fins acadêmicos.
          </p>
        </div>
        <div className="footer-cols">
          <div className="d-flex flex-column" style={{ gap: 12 }}>
            <span className="col-title">Navegue</span>
            <Link to="/residencias">Residências</Link>
            <Link to="/destinos">Destinos</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
          </div>
          <div className="d-flex flex-column" style={{ gap: 12, color: 'var(--text-2)' }}>
            <span className="col-title">Atendimento</span>
            <a href={CONTATO.telLink}>{CONTATO.telefone}</a>
            <a href={CONTATO.emailLink} style={{ wordBreak: 'break-all' }}>{CONTATO.email}</a>
            <span style={{ maxWidth: 260 }}>{CONTATO.endereco}</span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap" style={{ gap: 16, marginTop: 28, fontSize: 13, color: '#8f877a' }}>
        <span>© 2026 MONOLITO Residências · CRECI fictício 00.000-J</span>
        <span>Feito com React, Vite e Three.js</span>
      </div>
    </footer>
  )
}
