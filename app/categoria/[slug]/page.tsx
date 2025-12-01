import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/products'
import { generateBreadcrumbJsonLd } from '@/lib/seo'
import { Category } from '@/lib/types'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return [{ slug: 'vinos' }, { slug: 'licores' }, { slug: 'harinas' }]
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryNames = {
    vinos: 'Vinos',
    licores: 'Licores',
    harinas: 'Harinas',
  }

  const categoryName = categoryNames[params.slug as Category]
  if (!categoryName) return {}

  return {
    title: `${categoryName} - Catálogo`,
    description: `Explora nuestra selección de ${categoryName.toLowerCase()} artesanales premium.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const validCategories: Category[] = ['vinos', 'licores', 'harinas']
  if (!validCategories.includes(params.slug as Category)) {
    notFound()
  }

  const category = params.slug as Category
  const products = PRODUCTS.filter((p) => p.category === category)

  const categoryNames = {
    vinos: 'Vinos',
    licores: 'Licores',
    harinas: 'Harinas',
  }

  const categoryDescriptions = {
    vinos: 'Selección artesanal de vinos de cereza, manzana y moscatel. Presentaciones premium ideales para obsequios.',
    licores: 'Licores artesanales de la más alta calidad. Selección especial para ocasiones especiales y regalos corporativos.',
    harinas: 'Harinas tradicionales de la mejor calidad para natilla, buñuelos y arequipe. Perfectas para cestas personalizadas.',
  }

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Catálogo', url: '/catalogo' },
    { name: categoryNames[category], url: `/categoria/${category}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-brand-red">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalogo" className="hover:text-brand-red">
            Catálogo
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-brand-red font-medium">{categoryNames[category]}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">{categoryNames[category]}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">{categoryDescriptions[category]}</p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay productos disponibles en esta categoría en este momento.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

