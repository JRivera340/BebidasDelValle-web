'use client'

import { useMemo, useState } from 'react'
import { Filters, type CategoriaSeleccionada } from '@/components/product/Filters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { PRODUCTOS, filtrarProductos } from '@/lib/data/products'

export function CatalogoInteractivo() {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState<CategoriaSeleccionada>('todas')
  const [soloDisponibles, setSoloDisponibles] = useState(false)

  const visibles = useMemo(
    () => filtrarProductos({ texto, categoria, soloDisponibles }),
    [texto, categoria, soloDisponibles]
  )

  return (
    <div className="space-y-8">
      <Filters
        searchQuery={texto}
        onSearchChange={setTexto}
        selectedCategory={categoria}
        onCategoryChange={setCategoria}
        showAvailableOnly={soloDisponibles}
        onAvailableToggle={() => setSoloDisponibles((v) => !v)}
      />

      <p className="text-center text-sm text-suave" role="status" aria-live="polite">
        Mostrando {visibles.length} de {PRODUCTOS.length} productos
      </p>

      {visibles.length === 0 ? (
        <p className="py-12 text-center text-lg text-suave">
          No se encontraron productos con los filtros seleccionados
        </p>
      ) : (
        <ProductGrid productos={visibles} conTransicion />
      )}
    </div>
  )
}
