import { AnimatePresence, motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import type { Midia } from '../data/residencias'
import { useVideoAvailable } from '../hooks/useVideoAvailable'
import { IconArrowLeft, IconArrowRight, IconPlay } from './Icons'
import SectionTitle from './SectionTitle'
import VideoModal from './VideoModal'

interface Props {
  eyebrow: string
  title: string
  items: Midia[]
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Gallery({ eyebrow, title, items }: Props) {
  const [[idx, dir], setState] = useState<[number, number]>([0, 1])
  const [videoOpen, setVideoOpen] = useState(false)
  const n = items.length
  const go = (next: number, d: number) => setState([(next + n) % n, d])
  const prev = () => go(idx - 1, -1)
  const next = () => go(idx + 1, 1)
  const current = items[idx]
  const videoSrc = current.tipo === 'video' ? current.src : undefined
  const videoOk = useVideoAvailable(videoSrc)

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <section className="wrap section" aria-roledescription="carrossel" aria-label={title} onKeyDown={onKey}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        aside={
          <div className="d-flex align-items-center" style={{ gap: 16 }}>
            <span className="serif" style={{ fontSize: 24 }} aria-live="polite">
              {pad(idx + 1)} / {pad(n)}
            </span>
            <button type="button" className="icon-btn" aria-label="Foto anterior" onClick={prev}>
              <IconArrowLeft />
            </button>
            <button type="button" className="icon-btn solid" aria-label="Próxima foto" onClick={next}>
              <IconArrowRight />
            </button>
          </div>
        }
      />

      <motion.div
        className="gallery-stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next()
          else if (info.offset.x > 60) prev()
        }}
        style={{ cursor: 'grab', touchAction: 'pan-y' }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={idx}
            className="slide"
            custom={dir}
            initial={{ opacity: 0, scale: 1.06, x: dir * 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: dir * -40 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.tipo === 'video' && videoOk ? (
              <video src={current.src} poster={current.poster} autoPlay muted loop playsInline aria-label={current.titulo} />
            ) : (
              <img src={current.tipo === 'video' ? current.poster : current.src} alt={current.titulo} draggable={false} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="gallery-caption">
          <div>
            <span className="small-label gold" style={{ display: 'block', letterSpacing: '.2em' }}>{current.categoria}</span>
            <span className="serif" style={{ fontSize: 34 }}>{current.titulo}</span>
          </div>
          {current.tipo === 'video' && (
            <button type="button" className="video-badge" onClick={() => setVideoOpen(true)}>
              <IconPlay size={16} /> Vídeo · {current.duracao}
            </button>
          )}
        </div>
      </motion.div>

      <div className="thumbs" role="tablist" aria-label="Escolher foto" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {items.map((m, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={m.titulo}
            onClick={() => go(i, i > idx ? 1 : -1)}
            style={{ opacity: i === idx ? 1 : 0.45, outline: i === idx ? '2px solid var(--gold)' : 'none' }}
          >
            <img src={m.tipo === 'video' ? m.poster : m.src} alt="" />
          </button>
        ))}
      </div>

      {current.tipo === 'video' && (
        <VideoModal show={videoOpen} onHide={() => setVideoOpen(false)} src={current.src} poster={current.poster} title={current.titulo} />
      )}
    </section>
  )
}
