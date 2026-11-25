import { Link } from 'react-router-dom'
import BlurText from '../components/fx/BlurText'
import Reveal from '../components/fx/Reveal'

export default function NotFound() {
  return (
    <section className="wrap page-header d-flex flex-column justify-content-center" style={{ minHeight: '80vh', paddingBottom: 120 }}>
      <p className="eyebrow">Erro 404</p>
      <BlurText as="h1" text={'Este endereço\nainda não foi construído.'} className="display" />
      <Reveal delay={0.4}>
        <p className="lead-text" style={{ margin: '28px 0 36px', maxWidth: 480 }}>
          A página que você procura não existe ou mudou de lugar.
        </p>
        <div className="d-flex flex-wrap" style={{ gap: 16 }}>
          <Link to="/" className="btn-gold">Voltar ao início</Link>
          <Link to="/residencias" className="btn-line">Ver residências</Link>
        </div>
      </Reveal>
    </section>
  )
}
