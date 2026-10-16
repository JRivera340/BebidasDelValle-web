'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type DocumentoConTransicion = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => unknown
}

/**
 * Envuelve la navegación interna en una View Transition para que la imagen de la tarjeta
 * pase a la ficha como elemento compartido. Sin soporte del navegador o con
 * prefers-reduced-motion se usa la navegación normal.
 */
export function TransicionPagina() {
  const router = useRouter()
  const pathname = usePathname()
  const resolver = useRef<(() => void) | null>(null)

  useEffect(() => {
    resolver.current?.()
    resolver.current = null
  }, [pathname])

  useEffect(() => {
    function alHacerClic(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const enlace = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!enlace || enlace.target === '_blank' || enlace.hasAttribute('download')) return

      const destino = new URL(enlace.href, window.location.href)
      if (destino.origin !== window.location.origin || destino.pathname === window.location.pathname) return

      const doc = document as DocumentoConTransicion
      if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      e.preventDefault()
      doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolver.current = resolve
            router.push(`${destino.pathname}${destino.search}${destino.hash}`)
            window.setTimeout(resolve, 1500)
          })
      )
    }

    document.addEventListener('click', alHacerClic, true)
    return () => document.removeEventListener('click', alHacerClic, true)
  }, [router])

  return null
}
