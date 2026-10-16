'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ImagenProducto } from '@/lib/types'

interface ProductGalleryProps {
  imagenes: ImagenProducto[]
}

export function ProductGallery({ imagenes }: ProductGalleryProps) {
  const [activa, setActiva] = useState(0)
  const actual = imagenes[activa]

  const siguiente = () => setActiva((i) => (i + 1) % imagenes.length)
  const anterior = () => setActiva((i) => (i - 1 + imagenes.length) % imagenes.length)

  return (
    <div className="mx-auto w-full max-w-md space-y-4" data-acento={actual.acento}>
      <div className="halo-producto relative aspect-[3/4] overflow-hidden rounded-2xl bg-producto-fondo/30">
        <Image
          key={actual.src}
          src={actual.src}
          alt={actual.alt}
          fill
          priority={activa === 0}
          data-testid="ficha-imagen"
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 448px"
        />

        {imagenes.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-fondo/80 backdrop-blur-sm"
              onClick={anterior}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-fondo/80 backdrop-blur-sm"
              onClick={siguiente}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </>
        )}
      </div>

      {imagenes.length > 1 && (
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Miniaturas">
          {imagenes.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActiva(i)}
                aria-label={`Ver imagen ${i + 1} de ${imagenes.length}`}
                aria-current={i === activa}
                className={`relative block h-20 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                  i === activa ? 'border-brand-gold' : 'border-transparent hover:border-border'
                }`}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
