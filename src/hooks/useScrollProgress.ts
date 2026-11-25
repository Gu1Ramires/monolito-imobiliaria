import { useEffect, useRef, type RefObject } from 'react'

/**
 * Progresso de 0 a 1 enquanto a seção (alta, com conteúdo sticky) passa pela tela.
 * Retorna um ref (sem re-render a cada frame) e chama onStep quando o valor muda.
 */
export function useScrollProgress(
  target: RefObject<HTMLElement | null>,
  onChange?: (p: number) => void,
) {
  const progress = useRef(0)
  const cb = useRef(onChange)
  cb.current = onChange

  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = target.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      if (p !== progress.current) {
        progress.current = p
        cb.current?.(p)
      }
    }
    const loop = () => {
      update()
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return progress
}
