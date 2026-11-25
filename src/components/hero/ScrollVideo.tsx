import { useEffect, useRef, type RefObject } from 'react'

/**
 * Vídeo "esfregado" pelo scroll: o progresso da seção (0 → 1) vira o tempo do vídeo.
 * Para ficar fluido, exporte o vídeo com keyframes frequentes, por exemplo:
 * ffmpeg -i entrada.mp4 -vf scale=1920:-2 -c:v libx264 -g 1 -crf 22 -an public/videos/hero.mp4
 */
export default function ScrollVideo({ src, poster, progress }: { src: string; poster: string; progress: RefObject<number> }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let raf = 0
    let current = 0
    const loop = () => {
      const v = ref.current
      if (v && v.duration && !Number.isNaN(v.duration)) {
        const target = (progress.current ?? 0) * (v.duration - 0.05)
        current += (target - current) * 0.12
        if (Math.abs(v.currentTime - current) > 0.012) v.currentTime = current
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [progress])

  return (
    <video
      ref={ref}
      className="hero-video"
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-label="Vídeo da Casa Horizonte sendo construída conforme a rolagem"
    />
  )
}
