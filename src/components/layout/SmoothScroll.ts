import Lenis from 'lenis'

let lenis: Lenis | null = null
let raf = 0

export function startLenis() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  const loop = (time: number) => {
    lenis?.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
}

export function stopLenis() {
  cancelAnimationFrame(raf)
  lenis?.destroy()
  lenis = null
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export function pauseScroll(paused: boolean) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
