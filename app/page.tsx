import Link from 'next/link'
import { MessageCircle, Package, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import { Hero } from '@/components/sections/Hero'
import { AccordionShowroom } from '@/components/sections/AccordionShowroom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { waBasketMessage } from '@/lib/whatsapp'
import { PRODUCTOS, getProductoPorSlug } from '@/lib/data/products'
import { COLECCIONES } from '@/lib/data/collections'

const beneficios = [
  {
    icono: Package,
    titulo: 'Cestas a tu medida',
    texto: 'Tú eliges los productos y armamos la combinación para cada ocasión.',
  },
  {
    icono: Sparkles,
    titulo: 'Selección de temporada',
    texto: 'Bebidas, mezclas para postres y tortas pensadas para compartir.',
  },
  {
    icono: MessageCircle,
    titulo: 'Atención por WhatsApp',
    texto: 'Escríbenos y te ayudamos a definir tu cesta ideal.',
  },
]

export default function HomePage() {
  const protagonista = getProductoPorSlug('navifiest-manzana') ?? PRODUCTOS[0]

  return (
    <>
      <Hero imagen={protagonista.imagenes[0]} />

      <Section id="beneficios" superficie>
        <ul className="grid gap-8 sm:grid-cols-3">
          {beneficios.map(({ icono: Icono, titulo, texto }) => (
            <li key={titulo} className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10">
                <Icono className="h-8 w-8 text-brand-gold" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl">{titulo}</h3>
              <p className="max-w-xs text-suave">{texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="colecciones"
        titulo="Nuestras colecciones"
        descripcion="Combinaciones pensadas para regalar o compartir."
      >
        <AccordionShowroom colecciones={COLECCIONES} />
      </Section>

      <Section
        id="destacados"
        titulo="Productos destacados"
        descripcion="Lo que más se suma a una cesta."
        superficie
      >
        <ProductGrid productos={PRODUCTOS} />
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/catalogo">Ver todos</Link>
          </Button>
        </div>
      </Section>

      <Section
        id="cta"
        titulo="¿Listo para crear tu cesta personalizada?"
        descripcion="Escríbenos por WhatsApp y te ayudamos a elegir los productos para tu ocasión."
      >
        <div className="flex justify-center" data-testid="cta-final">
          <Button asChild size="lg" variant="primary">
            <a href={waBasketMessage('home-cierre')} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Solicitar cotización
            </a>
          </Button>
        </div>
      </Section>
    </>
  )
}
