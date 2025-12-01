import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, MessageCircle, Package, Clock } from 'lucide-react'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PRODUCTS, getProductBySlug } from '@/lib/products'
import { waProductMessage } from '@/lib/whatsapp'
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'
import { Category } from '@/lib/types'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const categoryNames: Record<Category, string> = {
    vinos: 'Vinos',
    licores: 'Licores',
    harinas: 'Harinas',
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3)

  const productJsonLd = generateProductJsonLd(product)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Catálogo', url: '/catalogo' },
    { name: categoryNames[product.category], url: `/categoria/${product.category}` },
    { name: product.name, url: `/producto/${product.slug}` },
  ])

  const waLink = waProductMessage({ name: product.name, slug: product.slug })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-brand-red">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalogo" className="hover:text-brand-red">
            Catálogo
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/categoria/${product.category}`} className="hover:text-brand-red">
            {categoryNames[product.category]}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-brand-red font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                {!product.available && (
                  <Badge variant="destructive">No disponible</Badge>
                )}
              </div>
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, idx) => (
                    <Badge key={idx} variant="gold">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold">Presentaciones disponibles</h3>
                <div className="space-y-2">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-700">{variant.name}</span>
                      <span className="text-sm text-gray-500">SKU: {variant.sku}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-3">Características</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Package className="h-5 w-5 text-brand-red" />
                <span>Empaque premium listo para regalo</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="h-5 w-5 text-brand-red" />
                <span>Entrega disponible 24-48h</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full group"
              disabled={!product.available}
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Productos relacionados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, idx) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button (Mobile) */}
      {product.available && (
        <div className="fixed bottom-6 right-6 lg:hidden z-50">
          <Button
            asChild
            variant="primary"
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl animate-pulse hover:animate-none"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-6 w-6" />
            </a>
          </Button>
        </div>
      )}
    </>
  )
}

