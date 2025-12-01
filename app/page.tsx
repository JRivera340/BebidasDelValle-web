import Link from 'next/link'
import { MessageCircle, Package, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { AccordionShowroom } from '@/components/AccordionShowroom'
import { LogoCarousel } from '@/components/LogoCarousel'
import { waBasketMessage } from '@/lib/whatsapp'
import { PRODUCTS, COLLECTIONS } from '@/lib/products'

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-red via-brand-red-hover to-brand-gold text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-32">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Cestas personalizadas que dejan huella
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
              Selección premium de vinos artesanales y harinas tradicionales. Ideal para regalos
              corporativos y obsequios de temporada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-red hover:bg-gray-100 group w-full sm:w-auto"
              >
                <a
                  href={waBasketMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Armar mi cesta
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 w-full sm:w-auto">
                <Link href="/catalogo">Explorar catálogo</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-2 md:space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-red/10">
                <Package className="h-7 w-7 md:h-8 md:w-8 text-brand-red" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">Presentación premium</h3>
              <p className="text-sm md:text-base text-gray-600">
                Empaque elegante y personalizado para cada ocasión
              </p>
            </div>
            <div className="text-center space-y-2 md:space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-gold/10">
                <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-brand-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">Selección de temporada</h3>
              <p className="text-sm md:text-base text-gray-600">
                Productos cuidadosamente seleccionados para cada momento
              </p>
            </div>
            <div className="text-center space-y-2 md:space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-red/10">
                <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-brand-red" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">Atención personalizada</h3>
              <p className="text-sm md:text-base text-gray-600">
                Asesoría directa por WhatsApp para armar tu cesta ideal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Showroom */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-2 md:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Nuestras colecciones</h2>
            <p className="text-base md:text-lg text-gray-600">
              Descubre nuestras selecciones especiales, diseñadas para impresionar
            </p>
          </div>
          <AccordionShowroom collections={COLLECTIONS} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Productos destacados</h2>
            <Button asChild variant="outline" size="sm" className="sm:size-default">
              <Link href="/catalogo">Ver todos</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-brand-gold to-brand-gold-hover text-white">
        <div className="container mx-auto px-4 text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4">¿Listo para crear tu cesta personalizada?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
            Contacta con nosotros por WhatsApp y te ayudaremos a seleccionar los mejores productos
            para tu ocasión especial.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand-gold hover:bg-gray-100 group w-full sm:w-auto max-w-xs mx-auto"
          >
            <a
              href={waBasketMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              Solicitar cotización
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}

