import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Pavimento } from '../data/residencias'
import SectionTitle from './SectionTitle'

export default function FloorPlan({ pavimentos, nome, planta }: { pavimentos: Pavimento[]; nome: string; planta: string }) {
  const [atual, setAtual] = useState(0)
  const pav = pavimentos[atual]

  return (
    <section className="wrap section" aria-label="Planta">
      <SectionTitle
        eyebrow="Arquitetura"
        title="Planta da residência"
        aside={
          <div role="group" aria-label="Pavimento" className="d-flex flex-wrap" style={{ gap: 8 }}>
            {pavimentos.map((p, i) => (
              <button key={p.nome} type="button" className={`chip ${i === atual ? 'active' : ''}`} aria-pressed={i === atual} onClick={() => setAtual(i)}>
                {p.nome}
              </button>
            ))}
          </div>
        }
      />
      <div className="d-flex flex-wrap align-items-start" style={{ gap: 48 }}>
        <div style={{ flex: '999 1 600px', minWidth: 0, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={atual}
              src={planta}
              alt={`Planta do pavimento ${pav.nome.toLowerCase()} da ${nome}`}
              style={{ width: '100%', border: '1px solid var(--line)' }}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        <ul className="room-list" style={{ flex: '1 1 260px' }}>
          <AnimatePresence mode="popLayout">
            {pav.comodos.map((c, i) => (
              <motion.li
                key={`${atual}-${c.nome}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                exit={{ opacity: 0 }}
              >
                <span>{c.nome}</span>
                <span className="muted">{c.area}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}
