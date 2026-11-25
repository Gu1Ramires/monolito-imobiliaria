import { motion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { scrollToTop } from './SmoothScroll'

const ease = [0.76, 0, 0.24, 1] as const

/** Fade da página + cortina dourada que varre a tela (inspirado em transitions.dev). */
export default function PageTransition({ children, title }: { children: ReactNode; title?: string }) {
  useEffect(() => {
    if (title) document.title = `${title} — MONOLITO`
    scrollToTop()
  }, [title])

  return (
    <>
      <motion.main
        id="conteudo"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.main>
      {/* cortina que sai (revela a nova página) */}
      <motion.div
        className="curtain"
        aria-hidden="true"
        style={{ originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.65, ease, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      />
      {/* cortina que entra (cobre a página antiga) */}
      <motion.div
        className="curtain"
        aria-hidden="true"
        style={{ originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.5, ease } }}
      />
    </>
  )
}
