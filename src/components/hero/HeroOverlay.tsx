import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { IconMouse, IconPlayCircle } from '../Icons'
import Magnetic from '../fx/Magnetic'

export const ETAPAS = ['Fundação', 'Estrutura', 'Fachada de vidro', 'Pronta para viver']

interface Props {
  stage: number
  pct: number
  interactive: boolean
  onPlay: () => void
}

const up = (d: number) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, delay: 0.6 + d, ease: [0.22, 1, 0.36, 1] as const },
})

export default function HeroOverlay({ stage, pct, interactive, onPlay }: Props) {
  return (
    <>
      <div className="hero-shade" />
      <div className="hero-overlay">
        <div className="wrap hero-overlay-inner">
          <div style={{ maxWidth: 660 }}>
            <motion.p className="eyebrow" style={{ marginBottom: 20 }} {...up(0)}>Coleção 2027 · 12 residências</motion.p>
            <motion.h1 className="display" {...up(0.1)}>
              Arquitetura<br />que se revela.
            </motion.h1>
            <motion.p className="lead-text" style={{ margin: '28px 0 36px', maxWidth: 480 }} {...up(0.22)}>
              {interactive
                ? 'Role a página e veja a Casa Horizonte ganhar forma, da fundação à luz acesa.'
                : 'Doze residências autorais, cada uma desenhada para um único terreno.'}
            </motion.p>
            <motion.div className="d-flex flex-wrap" style={{ gap: 16 }} {...up(0.32)}>
              <Magnetic>
                <Link to="/residencias" className="btn-gold">Ver residências</Link>
              </Magnetic>
              <button type="button" className="btn-line" onClick={onPlay}>
                <IconPlayCircle size={18} /> Assistir o filme
              </button>
            </motion.div>
          </div>

          {interactive && (
            <motion.ol className="stage-list" aria-label="Etapas da construção conforme o scroll" {...up(0.4)}>
              {ETAPAS.map((e, i) => (
                <li key={e} className={i === stage ? 'on' : ''} aria-current={i === stage ? 'step' : undefined}>
                  {i === stage && <motion.span layoutId="stage-indicator" className="indicator" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  {e}
                </li>
              ))}
            </motion.ol>
          )}
        </div>
      </div>
      {interactive && (
        <div className="scroll-hint" aria-hidden="true">
          <IconMouse /> {pct >= 100 ? 'Pronta para viver' : `Role para construir · ${pct}%`}
        </div>
      )}
    </>
  )
}
