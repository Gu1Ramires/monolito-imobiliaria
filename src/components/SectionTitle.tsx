import type { ReactNode } from 'react'
import Reveal from './fx/Reveal'

interface Props {
  eyebrow: string
  title: ReactNode
  aside?: ReactNode
  maxWidth?: number
  as?: 'h1' | 'h2'
}

export default function SectionTitle({ eyebrow, title, aside, maxWidth = 760, as = 'h2' }: Props) {
  const H = as
  return (
    <Reveal className="d-flex justify-content-between align-items-end flex-wrap" style={{ gap: 24, marginBottom: 44 }}>
      <div style={{ maxWidth }}>
        <p className="eyebrow">{eyebrow}</p>
        <H className="h-section">{title}</H>
      </div>
      {aside}
    </Reveal>
  )
}
