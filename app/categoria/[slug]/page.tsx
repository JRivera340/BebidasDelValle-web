import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/Section'
import { EncabezadoPagina } from '@/components/layout/EncabezadoPagina'
import { Breadcrumb } from '@/components/product/Breadcrumb'
import { ProductGrid } from '@/components/product/ProductGrid'
import { CATEGORIAS, esCategoria, getProductosPorCategoria } from '@/lib/data/products'
import { generateBreadcrumbJsonLd } from '@/lib/seo'

interface CategoriaPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(CATEGORIAS).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: CategoriaPageProps): Metadata {
  if (!esCategoria(params.slug)) return {}
  const categoria = CATEGORIAS[params.slug]
  return {
    title: categoria.nombre,
    description: categoria.descripcion,
    alternates: { canonical: `/categoria/${params.slug}` },
  }
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  if (!esCategoria(params.slug)) notFound()

  const categoria = CATEGORIAS[params.slug]
  const productos = getProductosPorCategoria(params.slug)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Catálogo', url: '/catalogo' },
    { name: categoria.nombre, url: `/categoria/${params.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <EncabezadoPagina titulo={categoria.nombre} descripcion={categoria.descripcion} />
      <Section>
        <Breadcrumb
          items={[
            { nombre: 'Inicio', href: '/' },
            { nombre: 'Catálogo', href: '/catalogo' },
            { nombre: categoria.nombre },
          ]}
        />
        {productos.length > 0 ? (
          <ProductGrid productos={productos} conTransicion />
        ) : (
          <p className="py-12 text-center text-lg text-suave">
            No hay productos disponibles en esta categoría por ahora.
          </p>
        )}
      </Section>
    </>
  )
}
