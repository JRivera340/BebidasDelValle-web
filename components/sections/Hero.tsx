import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { waBasketMessage } from '@/lib/whatsapp'
import type { ImagenProducto } from '@/lib/types'

interface HeroProps {
  imagen: ImagenProducto
}

export function Hero({ imagen }: HeroProps) {
  return (
    <section
      data-testid="hero"
      data-acento={imagen.acento}
      aria-labelledby="hero-titulo"
      className="halo-producto relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-10"
    >
      <Container className="flex flex-col items-center gap-8 text-center">
        <div className="max-w-3xl space-y-5">
          <h1 id="hero-titulo" className="font-display text-titular text-balance">
            Cestas personalizadas que dejan huella
          </h1>
          <p className="mx-auto max-w-prose text-pretty text-lg text-suave md:text-xl">
            Bebidas sin alcohol, mezclas para postres y tortas de temporada. Ideal para regalos corporativos y
            obsequios.
          </p>
        </div>

        <div className="relative h-[min(38svh,26rem)] w-[min(60vw,19.5rem)]" data-testid="botella-principal">
          <Image
            src={imagen.src}
            alt={imagen.alt}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 70vw, 336px"
          />
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
