import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import type { Producto } from '@/lib/types'
import { waProductMessage } from '@/lib/whatsapp'
import { CATEGORIAS, LINEAS, nombreCompleto } from '@/lib/data/products'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SellosAdvertencia } from '@/components/product/SellosAdvertencia'

interface ProductCardProps {
  conTransicion?: boolean
  producto: Producto
}

export function ProductCard({ producto, conTransicion = false }: ProductCardProps) {
  const waLink = waProductMessage(
    { name: nombreCompleto(producto), slug: producto.slug },
    `tarjeta-${producto.slug}`
  )
  const imagen = producto.imagenes[0]

  return (
    <Card
      data-acento={producto.acento}
      data-testid="tarjeta-producto"
      className="group flex h-full w-full max-w-sm flex-col overflow-hidden bg-superficie transition-transform duration-300 hover:-translate-y-1"
    >
      <Link
        href={`/producto/${producto.slug}`}
        style={conTransicion ? { viewTransitionName: `producto-${producto.slug}` } : undefined}
        className="halo-producto relative block aspect-[3/4] overflow-hidden bg-producto-fondo/30"
        aria-label={`Ver ${nombreCompleto(producto)}`}
      >
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          data-testid="tarjeta-imagen"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
        />
      </Link>

      <CardHeader className="items-center text-center">
        <Badge variant="outline" className="mb-1 text-xs uppercase tracking-wide">
          {LINEAS[producto.linea]}
        </Badge>
        <CardTitle className="font-display text-2xl">{producto.nombre}</CardTitle>
        <CardDescription className="line-clamp-3 text-suave">{producto.descripcion}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col items-center gap-3 text-center">
        <p className="text-sm text-suave">
          {CATEGORIAS[producto.categoria].nombre}
          {producto.presentaciones.length > 0 &&
            ` · ${producto.presentaciones.map((p) => p.tamano).join(' / ')}`}
        </p>
        <SellosAdvertencia sellos={producto.sellos} tamano="sm" className="mt-auto" />
      </CardContent>

      <CardFooter className="flex flex-wrap justify-center gap-2 pt-0">
        <Button asChild variant="outline" size="sm">
          <Link href={`/producto/${producto.slug}`}>Ver detalles</Link>
        </Button>
        <Button asChild variant="primary" size="sm" aria-disabled={!producto.disponible}>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            Consultar
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
