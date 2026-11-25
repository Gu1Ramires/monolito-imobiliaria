import type { MouseEvent, ReactNode } from 'react'

/** Brilho radial dourado que segue o mouse (inspirado no SpotlightCard do React Bits). */
export default function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div className={`spotlight ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  )
}
