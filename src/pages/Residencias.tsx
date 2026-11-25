import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import Form from 'react-bootstrap/Form'
import BlurText from '../components/fx/BlurText'
import Reveal from '../components/fx/Reveal'
import ResidenciaCard from '../components/ResidenciaCard'
import { residencias, type Regiao } from '../data/residencias'

type Filtro = 'todas' | Regiao
type Ordem = 'recentes' | 'area' | 'maior' | 'menor'

const chips: { id: Filtro; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'litoral', label: 'Litoral' },
  { id: 'serra', label: 'Serra' },
  { id: 'nordeste', label: 'Nordeste' },
]

export default function Residencias() {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [suites, setSuites] = useState(0)
  const [ordem, setOrdem] = useState<Ordem>('recentes')

  const lista = useMemo(() => {
    const base = residencias.filter((r) => (filtro === 'todas' || r.regiao === filtro) && r.suites >= suites)
    const sorted = [...base]
    if (ordem === 'area') sorted.sort((a, b) => b.area - a.area)
    else if (ordem === 'maior') sorted.sort((a, b) => b.preco - a.preco)
    else if (ordem === 'menor') sorted.sort((a, b) => a.preco - b.preco)
    else sorted.sort((a, b) => a.ordem - b.ordem)
    return sorted
  }, [filtro, suites, ordem])

  const limpar = () => {
    setFiltro('todas')
    setSuites(0)
  }

  return (
    <>
      <header className="wrap page-header d-flex justify-content-between align-items-end flex-wrap" style={{ gap: 32 }}>
        <div>
          <p className="eyebrow">Coleção 2027</p>
          <BlurText as="h1" text="Residências" className="display" />
        </div>
        <Reveal delay={0.3}>
          <p className="body-text mb-0" style={{ maxWidth: 420 }}>
            Seis casas autorais abertas para visita nesta fase da coleção, cada uma desenhada para um único terreno.
          </p>
        </Reveal>
      </header>

      <section aria-label="Filtros" className="wrap" style={{ paddingBottom: 40 }}>
        <div className="filters-bar">
          <div role="group" aria-label="Paisagem" className="d-flex flex-wrap" style={{ gap: 10 }}>
            {chips.map((c) => (
              <button key={c.id} type="button" className={`chip ${filtro === c.id ? 'active' : ''}`} aria-pressed={filtro === c.id} onClick={() => setFiltro(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="d-flex flex-wrap align-items-center" style={{ gap: 16 }}>
            <Form.Group controlId="f-suites" className="d-flex align-items-center" style={{ gap: 10 }}>
              <Form.Label className="mb-0">Suítes</Form.Label>
              <Form.Select value={suites} onChange={(e) => setSuites(Number(e.target.value))}>
                <option value={0}>Todas</option>
                <option value={5}>5+</option>
                <option value={6}>6+</option>
                <option value={7}>7+</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="f-ordem" className="d-flex align-items-center" style={{ gap: 10 }}>
              <Form.Label className="mb-0">Ordenar</Form.Label>
              <Form.Select value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)}>
                <option value="recentes">Mais recentes</option>
                <option value="area">Maior área</option>
                <option value="maior">Maior valor</option>
                <option value="menor">Menor valor</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <p className="muted" style={{ margin: '20px 0 0', fontSize: 14 }} aria-live="polite">
          {lista.length} {lista.length === 1 ? 'residência encontrada' : 'residências encontradas'}
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 140 }}>
        {lista.length === 0 ? (
          <div className="text-center" style={{ padding: '80px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <p className="serif" style={{ fontSize: 40 }}>Nenhuma residência com esses filtros.</p>
            <button type="button" className="btn-line gold-border mt-3" onClick={limpar}>Limpar filtros</button>
          </div>
        ) : (
          <motion.div layout className="row g-4" style={{ rowGap: 56 }}>
            <AnimatePresence mode="popLayout">
              {lista.map((r) => (
                <motion.div
                  key={r.slug}
                  layout
                  className="col-md-6 col-lg-4"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ResidenciaCard r={r} ratio="4 / 3" showStatus />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  )
}
