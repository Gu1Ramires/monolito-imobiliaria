import { motion } from 'motion/react'
import { useMemo, type ElementType, type ReactNode } from 'react'

interface Props {
  /** Texto simples; use \n para quebrar linha. */
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  /** Trecho (no fim) que recebe destaque em itálico dourado. */
  highlight?: string
}

const word = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 18 },
  show: { opacity: 1, filter: 'blur(0px)', y: 0 },
}

/** Palavras entram do desfocado para o nítido, em sequência (inspirado no BlurText do React Bits). */
export default function BlurText({ text, as = 'h2', className, delay = 0, stagger = 0.06, highlight }: Props) {
  const Tag = useMemo(() => motion.create(as), [as])
  const lines = text.split('\n')
  let i = 0
  const renderWords = (line: string, hl: boolean): ReactNode[] =>
    line.split(' ').filter(Boolean).map((w) => {
      const idx = i++
      return (
        <motion.span
          key={`${w}-${idx}`}
          variants={word}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + idx * stagger }}
          style={{ display: 'inline-block', marginRight: '0.24em' }}
          className={hl ? 'gold' : undefined}
        >
          {hl ? <em>{w}</em> : w}
        </motion.span>
      )
    })

  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {renderWords(line, false)}
        </span>
      ))}
      {highlight && <span style={{ display: 'block' }}>{renderWords(highlight, true)}</span>}
    </Tag>
  )
}
