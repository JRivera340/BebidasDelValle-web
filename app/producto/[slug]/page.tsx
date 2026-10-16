import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Breadcrumb } from '@/components/product/Breadcrumb'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SellosAdvertencia } from '@/components/product/SellosAdvertencia'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CATEGORIAS, LINEAS, PRODUCTOS, getProductoPorSlug, nombreCompleto } from '@/lib/data/products'
import { waProductMessage } from '@/lib/whatsapp'
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'

interface ProductoPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: ProductoPageProps): Metadata {
  const producto = getProductoPorSlug(params.slug)
  if (!producto) return {}
  const titulo = nombreCompleto(producto)
  return {
    title: titulo,
    description: producto.descripcion,
    alternates: { canonical: `/producto/${producto.slug}` },
    openGraph: {
      title: titulo,
      description: producto.descripcion,
      images: producto.imagenes.map((i) => ({ url: i.src, alt: i.alt })),
    },
  }
}

export default function ProductoPage({ params }: ProductoPageProps) {
  const producto = getProductoPorSlug(params.slug)
  if (!producto) notFound()

  const categoria = CATEGORIAS[producto.categoria]
  const titulo = nombreCompleto(producto)
  const relacionados = PRODUCTOS.filter((p) => p.slug !== producto.slug).slice(0, 3)
  const waLink = waProductMessage({ name: titulo, slug: producto.slug }, `ficha-${producto.slug}`)

  const productoJsonLd = generateProductJsonLd(producto)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Catálogo', url: '/catalogo' },
    { name: categoria.nombre, url: `/categoria/${producto.categoria}` },
    { name: titulo, url: `/producto/${producto.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div data-acento={producto.acento} className="halo-producto">
        <Container className="py-[clamp(2rem,5vw,4rem)]">
          <Breadcrumb
            items={[
              { nombre: 'Inicio', href: '/' },
              { nombre: 'Catálogo', href: '/catalogo' },
              { nombre: categoria.nombre, href: `/categoria/${producto.categoria}` },
              { nombre: titulo },
            ]}
          />

          <div className="flex flex-col items-center gap-10">
            <ProductGallery slug={producto.slug} imagenes={producto.imagenes} />

            <div className="flex w-full max-w-prose flex-col items-center gap-6 text-center">
              <div className="space-y-3">
                <Badge variant="outline" className="uppercase tracking-wide">
                  {LINEAS[producto.linea]}
                </Badge>
                <h1 className="font-display text-seccion text-balance">{producto.nombre}</h1>
                <p className="text-lg text-suave">{producto.descripcion}</p>
              </div>

              {producto.presentaciones.length > 0 && (
                <div className="w-full rounded-lg border border-border bg-superficie p-4">
                  <h2 className="mb-2 font-semibold">Presentaciones</h2>
                  <ul className="space-y-1 text-suave">
                    {producto.presentaciones.map((p) => (
                      <li key={p.tamano}>{p.tamano}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="w-full space-y-3">
                <h2 className="font-semibold">Información de advertencia</h2>
                <SellosAdvertencia sellos={producto.sellos} />
              </div>

              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto" aria-disabled={!producto.disponible}>
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Section id="relacionados" titulo="Otros productos" superficie>
        <ProductGrid productos={relacionados} conTransicion />
      </Section>
    </>
  )
}
