'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const sinMovimiento = useReducedMotion()
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (sinMovimiento || imagenes.length < 2) return
    const id = window.setInterval(() => {
      if (!document.hidden) setIndice((i) => (i + 1) % imagenes.length)
    }, INTERVALO_MS)
    return () => window.clearInterval(id)
  }, [sinMovimiento, imagenes.length])

  const actual = imagenes[indice]

  return (
    <section
      data-testid="hero"
      data-acento={actual.acento}
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
                  <motion.span
                    className="block"
                    initial={sinMovimiento ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {linea}
                  </motion.span>
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
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={actual.src}
              className="absolute inset-0"
              initial={sinMovimiento ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={sinMovimiento ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={actual.src}
                alt={actual.alt}
                fill
                priority={indice === 0}
                className="object-contain"
                sizes="(max-width: 640px) 60vw, 312px"
              />
            </motion.div>
          </AnimatePresence>
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
