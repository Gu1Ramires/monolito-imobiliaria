import { useEffect, useState } from 'react'

const cache = new Map<string, boolean>()

/**
 * Confere se um vídeo em /public existe de verdade (a Vercel devolve o index.html para arquivos ausentes).
 * Retorna null enquanto verifica, depois true ou false.
 */
export function useVideoAvailable(src?: string) {
  const [ok, setOk] = useState<boolean | null>(() => (src ? cache.get(src) ?? null : false))

  useEffect(() => {
    if (!src) return
    if (cache.has(src)) {
      setOk(cache.get(src)!)
      return
    }
    let alive = true
    fetch(src, { method: 'HEAD' })
      .then((r) => r.ok && (r.headers.get('content-type') ?? '').startsWith('video'))
      .catch(() => false)
      .then((v) => {
        cache.set(src, v)
        if (alive) setOk(v)
      })
    return () => {
      alive = false
    }
  }, [src])

  return ok
}
