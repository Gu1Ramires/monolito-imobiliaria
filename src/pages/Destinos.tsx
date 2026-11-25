import { Link } from 'react-router-dom'
import BlurText from '../components/fx/BlurText'
import ImageReveal from '../components/fx/ImageReveal'
import Reveal from '../components/fx/Reveal'
import { destinos } from '../data/destinos'
import { residencias } from '../data/residencias'
import { precoCurto } from '../utils/format'

export default function Destinos() {
  return (
    <>
      <header className="wrap page-header" style={{ paddingBottom: 96 }}>
        <p className="eyebrow">Sete destinos</p>
        <BlurText as="h1" text={'O terreno escolhe\na casa.'} className="display" />
        <Reveal delay={0.3}>
          <p className="lead-text" style={{ maxWidth: 560, marginTop: 28 }}>
            Antes do primeiro traço, passamos meses no lugar: vento, sol, som, vizinhança. Cada destino abaixo
            recebeu uma única residência MONOLITO.
          </p>
        </Reveal>
      </header>

      {destinos.map((d, i) => {
        const casas = residencias.filter((r) => r.cidade === d.cidade)
        const invert = i % 2 === 1
        return (
          <section key={d.cidade} className="wrap" style={{ paddingBottom: 120 }} aria-label={d.cidade}>
            <div className={`row g-5 align-items-center ${invert ? 'flex-lg-row-reverse' : ''}`}>
              <div className="col-lg-7">
                <ImageReveal src={d.imagem} alt={`${d.cidade}: ${d.paisagem}`} ratio="16 / 11" />
              </div>
              <div className="col-lg-5">
                <Reveal>
                  <p className="eyebrow">{String(i + 1).padStart(2, '0')} · {d.uf}</p>
                  <h2 className="h-section" style={{ fontSize: 'clamp(44px, 5vw, 64px)' }}>{d.cidade}</h2>
                  <p className="serif gold" style={{ fontSize: 24, fontStyle: 'italic', margin: '8px 0 20px' }}>{d.paisagem}</p>
                  <p className="body-text">{d.texto}</p>
                  {casas.length > 0 ? (
                    <ul className="room-list" style={{ borderTop: '1px solid var(--line)', marginTop: 28 }}>
                      {casas.map((c) => (
                        <li key={c.slug}>
                          <Link to={`/residencias/${c.slug}`}>{c.nome}</Link>
                          <span className="gold">{precoCurto(c.preco)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted" style={{ fontSize: 14, marginTop: 28 }}>Residência em fase de projeto. Lançamento em 2027.</p>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
