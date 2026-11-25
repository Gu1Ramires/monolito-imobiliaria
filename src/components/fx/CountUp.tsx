import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Conta de `from` até `to` quando aparece na tela. */
export default function CountUp({ to, from = 0, duration = 1.8 }: { to: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, from, to, duration])

  return <span ref={ref}>{value}</span>
}
