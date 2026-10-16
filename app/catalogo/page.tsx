import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { EncabezadoPagina } from '@/components/layout/EncabezadoPagina'
import { CatalogoInteractivo } from '@/components/product/CatalogoInteractivo'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Bebidas sin alcohol, mezclas para postres y tortas de temporada de Bebidas del Valle.',
  alternates: { canonical: '/catalogo' },
}

export default function CatalogoPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Catálogo de productos"
        descripcion="Explora la selección completa y consulta disponibilidad por WhatsApp."
      />
      <Section>
        <CatalogoInteractivo />
      </Section>
    </>
  )
}
