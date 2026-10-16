'use client'

import { useEffect } from 'react'
import { trackProductView } from '@/lib/analytics'

interface VistaProductoProps {
  slug: string
  nombre: string
  categoria: string
}

/** Registra la vista de una ficha en GA4. No renderiza nada. */
export function VistaProducto({ slug, nombre, categoria }: VistaProductoProps) {
  useEffect(() => {
    trackProductView(slug, nombre, categoria)
  }, [slug, nombre, categoria])
  return null
}
