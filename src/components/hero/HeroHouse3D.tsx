import { Component, lazy, Suspense, useCallback, useRef, useState, type ReactNode } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import VideoModal from '../VideoModal'
import HeroOverlay from './HeroOverlay'
import ScrollVideo from './ScrollVideo'
import { useVideoAvailable } from '../../hooks/useVideoAvailable'

const Scene = lazy(() => import('./Scene'))

const FALLBACK = '/images/casas/casa-horizonte/fachada.jpg'
/** Se este arquivo existir, o hero usa o vídeo controlado pelo scroll no lugar do 3D. */
const HERO_VIDEO = '/videos/hero.mp4'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

class GLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

const FallbackImage = () => (
  <img className="hero-fallback" src={FALLBACK} alt="Render da Casa Horizonte ao entardecer, com parte da estrutura em linhas de construção" />
)

export default function HeroHouse3D() {
  const reduced = usePrefersReducedMotion()
  const [webgl] = useState(hasWebGL)
  const heroVideo = useVideoAvailable(HERO_VIDEO)
  const interactive = (webgl || heroVideo === true) && !reduced
  const section = useRef<HTMLElement>(null)
  const [stage, setStage] = useState(0)
  const [pct, setPct] = useState(0)
  const [film, setFilm] = useState(false)

  const onChange = useCallback((p: number) => {
    setStage(Math.min(3, Math.floor(p * 4)))
    setPct(Math.round(p * 100))
  }, [])
  const progress = useScrollProgress(section, onChange)

  return (
    <section ref={section} className={`hero3d ${interactive ? '' : 'static'}`} aria-label="Casa Horizonte">
      <div className="hero3d-sticky">
        <div className="hero3d-canvas">
          {interactive && heroVideo === true ? (
            <ScrollVideo src={HERO_VIDEO} poster={FALLBACK} progress={progress} />
          ) : interactive && heroVideo === false ? (
            <GLBoundary fallback={<FallbackImage />}>
              <Suspense fallback={<FallbackImage />}>
                <Scene progress={progress} />
              </Suspense>
            </GLBoundary>
          ) : (
            <FallbackImage />
          )}
        </div>
        <HeroOverlay stage={stage} pct={pct} interactive={interactive} onPlay={() => setFilm(true)} />
      </div>
      <VideoModal show={film} onHide={() => setFilm(false)} src="/videos/tour.mp4" poster={FALLBACK} title="Um dia na Casa Horizonte" />
    </section>
  )
}
