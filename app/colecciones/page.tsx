import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { EncabezadoPagina } from '@/components/layout/EncabezadoPagina'
import { AccordionShowroom } from '@/components/sections/AccordionShowroom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'
import { COLECCIONES } from '@/lib/data/collections'
import { PRODUCTOS } from '@/lib/data/products'
import { waBasketMessage } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Colecciones',
  description: 'Combinaciones de bebidas, mezclas y tortas para armar cestas personalizadas y regalos corporativos.',
  alternates: { canonical: '/colecciones' },
}

export default function ColeccionesPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Nuestras colecciones"
        descripcion="Selecciones pensadas para regalar o compartir. Cada una se puede ajustar a tu cesta."
      />

      <Section>
        <AccordionShowroom colecciones={COLECCIONES} />
      </Section>

      {COLECCIONES.map((coleccion, i) => {
        const productos = PRODUCTOS.filter((p) => coleccion.productos.includes(p.slug))
        return (
          <Section
            key={coleccion.id}
            id={coleccion.id}
            titulo={coleccion.nombre}
            descripcion={coleccion.descripcion}
            acento={coleccion.acento}
            superficie={i % 2 === 0}
          >
            <div className="space-y-10">
              <ProductGrid productos={productos} />
              <div className="flex justify-center">
                <Button asChild variant="primary" size="lg">
                  <a href={waBasketMessage(`coleccion-${coleccion.id}`)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" />
                    Solicitar esta colección
                  </a>
                </Button>
              </div>
            </div>
          </Section>
        )
      })}

      <Section
        id="personalizada"
        titulo="¿No encuentras lo que buscas?"
        descripcion="Podemos armar una combinación según tus necesidades y preferencias."
      >
        <div className="flex justify-center">
          <Button asChild variant="primary" size="lg">
            <a href={waBasketMessage('colecciones-cierre')} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Crear colección personalizada
            </a>
          </Button>
        </div>
      </Section>
    </>
  )
}
