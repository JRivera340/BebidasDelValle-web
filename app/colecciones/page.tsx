import type { Metadata } from 'next'
import Link from 'next/link'
import { AccordionShowroom } from '@/components/AccordionShowroom'
import { ProductCard } from '@/components/ProductCard'
import { CollectionBadge } from '@/components/CollectionBadge'
import { Button } from '@/components/ui/button'
import { COLLECTIONS, PRODUCTS } from '@/lib/products'
import { waBasketMessage } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Colecciones',
  description: 'Explora nuestras colecciones especiales: Rojo Clásico, Dorado Premium y Blanco Esencial.',
}

export default function ColeccionesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-bold">Nuestras colecciones</h1>
            <p className="text-xl text-gray-600">
              Selecciones especialmente curadas que combinan tradición y excelencia. Cada colección
              cuenta una historia única.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Showroom */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AccordionShowroom collections={COLLECTIONS} />
        </div>
      </section>

      {/* Collections Detail */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {COLLECTIONS.map((collection) => {
              const collectionProducts = PRODUCTS.filter((p) =>
                collection.products.includes(p.id)
              )

              return (
                <div key={collection.id} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <CollectionBadge color={collection.color} name={collection.name} />
                    <div className="h-px flex-1 bg-gray-300" />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold">{collection.name}</h2>
                      <p className="text-lg text-gray-600">{collection.description}</p>
                      <ul className="space-y-2">
                        {collection.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-brand-gold" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        variant="primary"
                        size="lg"
                        className="group mt-4"
                      >
                        <a
                          href={waBasketMessage()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          Solicitar esta colección
                        </a>
                      </Button>
                    </div>

                    <div className="grid gap-6">
                      {collectionProducts.map((product, idx) => (
                        <ProductCard key={product.id} product={product} index={idx} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-red text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold">¿No encuentras lo que buscas?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Podemos crear una colección completamente personalizada según tus necesidades y
            preferencias.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand-red hover:bg-gray-100 group"
          >
            <a
              href={waBasketMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              Crear colección personalizada
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}

