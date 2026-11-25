import { motion } from 'motion/react'
import type { CSSProperties } from 'react'

interface Props {
  src: string
  alt: string
  ratio?: string
  height?: number | string
  className?: string
  style?: CSSProperties
}

const mask = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as const } },
}
const zoom = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const } },
}

/**
 * Imagem revelada por máscara de baixo para cima, com leve zoom-out.
 * O gatilho (whileInView) fica no wrapper externo, que não tem clip-path,
 * para o IntersectionObserver enxergar o elemento.
 */
export default function ImageReveal({ src, alt, ratio, height, className = '', style }: Props) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} style={{ aspectRatio: ratio, height, ...style }}>
      <motion.div className={`img-zoom ${className}`} variants={mask} style={{ width: '100%', height: '100%' }}>
        <motion.img src={src} alt={alt} loading="lazy" variants={zoom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
    </motion.div>
  )
}
