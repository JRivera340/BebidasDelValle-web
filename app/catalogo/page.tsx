'use client'

import { useState, useMemo } from 'react'
import { Metadata } from 'next'
import { ProductCard } from '@/components/ProductCard'
import { Filters } from '@/components/Filters'
import { PRODUCTS } from '@/lib/products'
import { Category } from '@/lib/types'

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false
      }

      // Availability filter
      if (showAvailableOnly && !product.available) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, showAvailableOnly])

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3">Catálogo de productos</h1>
        <p className="text-base md:text-lg text-gray-600">
          Explora nuestra selección completa de vinos y harinas artesanales
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <Filters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showAvailableOnly={showAvailableOnly}
            onAvailableToggle={() => setShowAvailableOnly(!showAvailableOnly)}
          />
        </aside>

        {/* Products Grid */}
        <div>
          <div className="mb-4 md:mb-6 text-xs md:text-sm text-gray-600">
            Mostrando {filteredProducts.length} de {PRODUCTS.length} productos
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base md:text-lg">
                No se encontraron productos con los filtros seleccionados
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

