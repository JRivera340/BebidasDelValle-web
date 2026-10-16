import type { Producto } from '@/lib/types'
import { ProductCard } from '@/components/product/ProductCard'

interface ProductGridProps {
  productos: Producto[]
}

/** Tarjetas del mismo ancho; la última fila incompleta queda centrada. */
export function ProductGrid({ productos }: ProductGridProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-6" data-testid="grid-productos">
      {productos.map((producto) => (
        <li key={producto.slug} className="flex w-full max-w-sm sm:w-[22rem] sm:max-w-none">
          <ProductCard producto={producto} />
        </li>
      ))}
    </ul>
  )
}
