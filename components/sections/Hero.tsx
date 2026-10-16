'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { waBasketMessage } from '@/lib/whatsapp'
import type { ImagenProducto } from '@/lib/types'

interface HeroProps {
  imagenes: ImagenProducto[]
}

const INTERVALO_MS = 4500
const LINEAS_TITULAR = ['Cestas personalizadas', 'que dejan huella']

export function Hero({ imagenes }: HeroProps) {
  const [indice, setIndice] = useState(0)
  // Solo se montan las imágenes ya mostradas: la primera no compite con las demás por ancho de banda
  const [montadas, setMontadas] = useState(1)

  useEffect(() => {
    if (imagenes.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setIndice((i) => (i + 1) % imagenes.length)
      setMontadas((m) => Math.min(imagenes.length, m + 1))
    }, INTERVALO_MS)
    return () => window.clearInterval(id)
  }, [imagenes.length])

  return (
    <section
      data-testid="hero"
      data-acento={imagenes[indice].acento}
      aria-labelledby="hero-titulo"
      className="halo-producto relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-10 transition-colors duration-700"
    >
      <Container className="flex flex-col items-center gap-8 text-center">
        <div className="max-w-3xl space-y-5">
          <h1 id="hero-titulo" className="font-display text-titular text-balance">
            <span className="sr-only">Cestas personalizadas que dejan huella</span>
            <span aria-hidden="true" className="block">
              {LINEAS_TITULAR.map((linea, i) => (
                <span key={linea} className="block overflow-hidden pb-1">
                  <span className="block animate-revelar" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                    {linea}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p className="mx-auto max-w-prose text-pretty text-lg text-suave md:text-xl">
            Bebidas sin alcohol, mezclas para postres y tortas de temporada. Ideal para regalos corporativos y
            obsequios.
          </p>
        </div>

        <div className="relative h-[min(38svh,26rem)] w-[min(60vw,19.5rem)]" data-testid="botella-principal">
          {imagenes.slice(0, montadas).map((imagen, i) => (
            <Image
              key={imagen.src}
              src={imagen.src}
              alt={imagen.alt}
              fill
              priority={i === 0}
              aria-hidden={i !== indice}
              className={`object-contain transition-[opacity,transform] duration-700 ease-out ${
                i === indice ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              sizes="(max-width: 640px) 60vw, 312px"
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3" data-testid="cta-hero">
          <Button asChild size="lg" variant="primary">
            <a href={waBasketMessage('hero')} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              Armar mi cesta
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/catalogo">Explorar catálogo</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
