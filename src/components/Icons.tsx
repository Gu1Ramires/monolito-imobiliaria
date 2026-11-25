import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 20, rest: SVGProps<SVGSVGElement> = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...rest,
})

export const IconArrowLeft = ({ size, ...r }: P) => <svg {...base(size, r)}><path d="M15 5l-7 7 7 7" /></svg>
export const IconArrowRight = ({ size, ...r }: P) => <svg {...base(size, r)}><path d="M9 5l7 7-7 7" /></svg>
export const IconPlayCircle = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4z" fill="currentColor" /></svg>
)
export const IconPlay = ({ size, ...r }: P) => (
  <svg {...base(size, { ...r, stroke: 'none', fill: 'currentColor' })}><path d="M8 5l12 7-12 7z" /></svg>
)
export const IconMenu = ({ size, ...r }: P) => <svg {...base(size, r)}><path d="M4 8h16M4 16h16" /></svg>
export const IconWhats = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" /></svg>
)
export const IconMouse = () => (
  <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="1" y="1" width="14" height="22" rx="7" />
    <line className="dot" x1="8" y1="6" x2="8" y2="10" />
  </svg>
)

const gold = { stroke: '#C2A06B', strokeWidth: 1.4 }
export const IconMic = () => <svg {...base(32, gold)}><path d="M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
export const IconGlass = () => <svg {...base(32, gold)}><rect x="3" y="4" width="18" height="16" /><path d="M12 4v16M3 12h9" /></svg>
export const IconSun = () => <svg {...base(32, gold)}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></svg>
export const IconShield = () => <svg {...base(32, gold)}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /></svg>
export const IconWine = () => <svg {...base(32, gold)}><path d="M8 3h8l-1 7a3 3 0 0 1-6 0z" /><path d="M12 13v8M8 21h8" /></svg>
export const IconWaves = () => <svg {...base(32, gold)}><path d="M3 18c2 0 2-2 4.5-2S10 18 12 18s2-2 4.5-2S19 18 21 18M3 13c2 0 2-2 4.5-2S10 13 12 13s2-2 4.5-2S19 13 21 13" /></svg>
