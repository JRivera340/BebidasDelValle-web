'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

/** Registra en GA4 cada clic hacia WhatsApp, con campaña y origen tomados del enlace. */
export function WhatsAppTracker() {
  useEffect(() => {
    function alHacerClic(e: MouseEvent) {
      const enlace = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]')
      if (!enlace) return
      const texto = new URL(enlace.href).searchParams.get('text') ?? ''
      const campana = /utm_campaign=([^&\s]+)/.exec(texto)?.[1] ?? 'desconocida'
      const origen = /ref=([^&\s]+)/.exec(texto)?.[1] ?? 'desconocido'
      trackEvent('generate_lead', { method: 'whatsapp', campaign: campana, source: origen })
    }
    document.addEventListener('click', alHacerClic)
    return () => document.removeEventListener('click', alHacerClic)
  }, [])

  return null
}
