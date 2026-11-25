import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link, useParams } from 'react-router-dom'
import FloorPlan from '../components/FloorPlan'
import { IconArrowLeft, IconArrowRight, IconPlay, IconWhats } from '../components/Icons'
import Reveal from '../components/fx/Reveal'
import ResidenciaCard from '../components/ResidenciaCard'
import SectionTitle from '../components/SectionTitle'
import VideoModal from '../components/VideoModal'
import { getResidencia, residencias, type Midia } from '../data/residencias'
import { metros, precoCompleto } from '../utils/format'
import NotFound from './NotFound'
import { CONTATO } from '../data/contato'

const fotoSrc = (m: Midia) => (m.tipo === 'video' ? m.poster : m.src)

export default function ResidenciaDetalhe() {
  const { slug } = useParams()
  const r = getResidencia(slug)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [film, setFilm] = useState(false)

  useEffect(() => {
    document.title = `${r ? r.nome : 'Residência não encontrada'} — MONOLITO`
  }, [r])

  if (!r) return <NotFound />

  const fotos = r.galeria.filter((m) => m.tipo === 'foto')
  const video = r.galeria.find((m) => m.tipo === 'video')
  const outras = residencias.filter((o) => o.slug !== r.slug && o.regiao === r.regiao).concat(residencias.filter((o) => o.regiao !== r.regiao)).slice(0, 2)
  const mosaico = fotos.map((f) => f.src).slice(0, 4)
  const todas = [...r.galeria.map(fotoSrc), r.planta].filter((s, i, a) => a.indexOf(s) === i)
  const consultor = { nome: 'Rafael Andrade', iniciais: 'RA' }

  const ficha = [
    { k: 'Área', v: metros(r.area) },
    { k: 'Terreno', v: metros(r.terreno) },
    { k: 'Suítes', v: String(r.suites) },
    { k: 'Vagas', v: r.vagas },
  ]

  return (
    <>
      <header className="detail-hero">
        <motion.img
          src={r.imagem}
          alt={`${r.nome} em ${r.cidade}`}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="content">
          <div className="wrap">
            <Link to="/residencias" className="d-inline-flex align-items-center" style={{ gap: 8, fontSize: 14, color: 'var(--text-2)', marginBottom: 24 }}>
              <IconArrowLeft size={16} /> Todas as residências
            </Link>
            <p className="eyebrow">{r.cidade} · {r.uf} · {r.status}</p>
            <motion.h1
              className="display"
              style={{ fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: 0.92 }}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {r.nome}
            </motion.h1>
          </div>
        </div>
      </header>

      {/* Ficha técnica */}
      <section aria-label="Ficha técnica" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap d-flex justify-content-between align-items-center flex-wrap" style={{ gap: 32, paddingTop: 32, paddingBottom: 32 }}>
          <dl className="d-flex flex-wrap mb-0" style={{ gap: '24px 56px' }}>
            {ficha.map((f) => (
              <div key={f.k}>
                <dt className="small-label">{f.k}</dt>
                <dd className="serif mb-0" style={{ fontSize: 32 }}>{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="d-flex align-items-center flex-wrap" style={{ gap: 24 }}>
            <span className="serif gold" style={{ fontSize: 40 }}>{precoCompleto(r.preco)}</span>
            <Link to={`/contato?residencia=${r.slug}`} className="btn-gold">Agendar visita privada</Link>
          </div>
        </div>
      </section>

      {/* Descrição + consultor */}
      <section className="wrap section d-flex flex-wrap" style={{ gap: 80 }}>
        <Reveal style={{ flex: '999 1 560px', minWidth: 0 }}>
          <p className="eyebrow">{r.bairro}</p>
          <h2 className="h-section" style={{ marginBottom: 28 }}>Uma casa desenhada para este terreno, e só para ele.</h2>
          <p className="lead-text">{r.descricao[0]}</p>
          <p className="lead-text mb-0">{r.descricao[1]}</p>
        </Reveal>
        <Reveal delay={0.15} style={{ flex: '1 1 320px', alignSelf: 'flex-start' }}>
          <aside className="surface" style={{ border: '1px solid var(--line)', padding: 32 }}>
            <p className="small-label gold" style={{ marginBottom: 18 }}>Seu consultor</p>
            <div className="d-flex align-items-center" style={{ gap: 16, marginBottom: 24 }}>
              <span className="avatar" aria-hidden="true">{consultor.iniciais}</span>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{consultor.nome}</div>
                <div className="muted" style={{ fontSize: 14 }}>Consultor de alto padrão</div>
              </div>
            </div>
            <a href={CONTATO.whatsapp} target="_blank" rel="noreferrer" className="btn-gold w-100" style={{ background: 'var(--text)', borderColor: 'var(--text)', marginBottom: 12 }}>
              <IconWhats size={18} /> Conversar no WhatsApp
            </a>
            <Link to={`/contato?residencia=${r.slug}`} className="btn-line w-100">Receber o book completo</Link>
          </aside>
        </Reveal>
      </section>

      {/* Mosaico */}
      <section aria-label="Galeria de fotos" className="wrap" style={{ paddingBottom: 140 }}>
        <Reveal>
          <div className="mosaic">
            {mosaico.map((src, i) => (
              <div key={src + i} className={i === 0 ? 'big' : i === 1 ? 'wide' : ''}>
                <button type="button" onClick={() => setLightbox(todas.indexOf(src))} aria-label={`Ampliar foto ${i + 1}`}>
                  <img src={src} alt="" loading="lazy" />
                  {i === mosaico.length - 1 && <span className="more">Ver as {todas.length} fotos</span>}
                </button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Vídeo */}
      {video && video.tipo === 'video' && (
        <section aria-label="Tour em vídeo" style={{ position: 'relative', height: 620, overflow: 'hidden' }}>
          <img src={video.poster} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,12,10,.5)' }} />
          <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ position: 'relative', height: '100%', gap: 24, padding: '0 24px' }}>
            <button type="button" className="play-round" aria-label="Reproduzir tour em vídeo" onClick={() => setFilm(true)}>
              <IconPlay size={28} />
            </button>
            <p className="serif mb-0" style={{ fontSize: 40 }}>Um dia na {r.nome}</p>
            <p className="small-label mb-0" style={{ color: 'var(--text-2)', letterSpacing: '.2em' }}>Filme · 3 min 20 s</p>
          </div>
          <VideoModal show={film} onHide={() => setFilm(false)} src={video.src} poster={video.poster} title={`Um dia na ${r.nome}`} />
        </section>
      )}

      <FloorPlan pavimentos={r.pavimentos} nome={r.nome} planta={r.planta} />

      {/* Localização */}
      <section aria-label="Localização" className="surface">
        <div className="wrap section d-flex flex-wrap align-items-center" style={{ gap: 64 }}>
          <Reveal style={{ flex: '1 1 360px' }}>
            <p className="eyebrow">Localização</p>
            <h2 className="h-section" style={{ marginBottom: 28 }}>{r.bairro}, {r.cidade}.</h2>
            <ul className="room-list" style={{ borderTop: '1px solid var(--line)' }}>
              {r.distancias.map((d) => (
                <li key={d.lugar}><span>{d.lugar}</span><span className="muted">{d.tempo}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} style={{ flex: '1.4 1 480px', minWidth: 0 }}>
            <svg role="img" aria-label={`Mapa estilizado com a localização da ${r.nome}`} viewBox="0 0 640 420" style={{ width: '100%', height: 'auto', background: 'var(--bg)', border: '1px solid var(--line)' }}>
              <path d="M120 80 C220 40 340 60 420 110 C500 160 540 240 500 320 C460 390 340 400 250 370 C160 340 90 280 80 200 C72 140 90 100 120 80 Z" fill="#1C1B18" stroke="#3A362F" strokeWidth="2" />
              <path d="M150 120 C220 160 300 150 360 200 C410 240 430 300 400 340" fill="none" stroke="#3A362F" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M200 300 C260 280 320 300 380 260" fill="none" stroke="#2A2722" strokeWidth="2" />
              <circle cx="380" cy="118" r="10" fill="#C2A06B" />
              <circle cx="380" cy="118" r="26" fill="none" stroke="#C2A06B" strokeWidth="1.5" opacity=".6">
                <animate attributeName="r" values="14;34;14" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values=".8;0;.8" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="410" y="112" fill="#ECE6DA" fontFamily="Manrope, sans-serif" fontSize="16">{r.nome}</text>
              <text x="410" y="132" fill="#A39A8A" fontFamily="Manrope, sans-serif" fontSize="13">{r.bairro}</text>
              <text x="40" y="400" fill="#A39A8A" fontFamily="Manrope, sans-serif" fontSize="13" letterSpacing="2">{r.cidade.toUpperCase()} · {r.uf}</text>
            </svg>
          </Reveal>
        </div>
      </section>

      {/* Outras */}
      <section className="wrap section">
        <SectionTitle eyebrow="Continue explorando" title="Outras residências" aside={<Link to="/residencias" className="link-underline-gold">Ver todas</Link>} />
        <div className="row g-4 gy-5">
          {outras.map((o, i) => (
            <Reveal key={o.slug} delay={i * 0.12} className="col-md-6">
              <ResidenciaCard r={o} ratio="16 / 10" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <Modal show={lightbox !== null} onHide={() => setLightbox(null)} centered size="xl" aria-label="Fotos da residência">
        <Modal.Header closeButton closeVariant="white" style={{ borderColor: 'var(--line)' }}>
          <Modal.Title as="h2" className="serif" style={{ fontSize: 26 }}>
            {r.nome} · {lightbox !== null ? lightbox + 1 : 0} / {todas.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0" style={{ position: 'relative' }}>
          {lightbox !== null && <img className="lightbox-img" src={todas[lightbox]} alt={`Foto ${lightbox + 1} da ${r.nome}`} />}
          <div className="d-flex justify-content-between" style={{ position: 'absolute', left: 16, right: 16, top: '50%', transform: 'translateY(-50%)' }}>
            <button type="button" className="icon-btn" style={{ background: 'rgba(13,12,10,.6)' }} aria-label="Foto anterior" onClick={() => setLightbox((l) => ((l ?? 0) - 1 + todas.length) % todas.length)}>
              <IconArrowLeft />
            </button>
            <button type="button" className="icon-btn solid" aria-label="Próxima foto" onClick={() => setLightbox((l) => ((l ?? 0) + 1) % todas.length)}>
              <IconArrowRight />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
