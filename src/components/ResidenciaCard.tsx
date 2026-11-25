import { Link } from 'react-router-dom'
import type { Residencia } from '../data/residencias'
import { metros, precoCurto } from '../utils/format'
import ImageReveal from './fx/ImageReveal'

interface Props {
  r: Residencia
  ratio?: string
  showStatus?: boolean
}

export default function ResidenciaCard({ r, ratio = '4 / 5', showStatus = false }: Props) {
  return (
    <Link to={`/residencias/${r.slug}`} className="res-card">
      <div style={{ position: 'relative' }}>
        {showStatus && <span className="status-badge">{r.status}</span>}
        <ImageReveal src={r.imagem} alt={`${r.nome}, ${r.cidade}`} ratio={ratio} />
      </div>
      <p className="small-label" style={{ margin: '22px 0 8px', letterSpacing: '.2em' }}>
        {r.cidade} · {r.uf}
      </p>
      <h3 style={{ fontWeight: 500, fontSize: 32, marginBottom: 12 }}>{r.nome}</h3>
      <div
        className="d-flex justify-content-between align-items-center flex-wrap"
        style={{ gap: 12, paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 15, color: 'var(--text-2)' }}
      >
        <span>{metros(r.area)} · {r.suites} suítes · {r.destaque}</span>
        <span className="serif gold" style={{ fontSize: 24 }}>{precoCurto(r.preco)}</span>
      </div>
    </Link>
  )
}
