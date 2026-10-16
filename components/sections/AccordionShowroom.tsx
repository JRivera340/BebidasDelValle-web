'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Coleccion } from '@/lib/types'
import { getProductoPorSlug, nombreCompleto } from '@/lib/data/products'
import { Button } from '@/components/ui/button'
import { waBasketMessage } from '@/lib/whatsapp'

interface AccordionShowroomProps {
  colecciones: Coleccion[]
}

function nombresDe(coleccion: Coleccion) {
  return coleccion.productos
    .map((slug) => getProductoPorSlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => nombreCompleto(p))
}

export function AccordionShowroom({ colecciones }: AccordionShowroomProps) {
  const [activo, setActivo] = useState(0)
  const sinMovimiento = useReducedMotion()
  const duracion = sinMovimiento ? 0 : 0.6

  const siguiente = () => setActivo((i) => (i + 1) % colecciones.length)
  const anterior = () => setActivo((i) => (i - 1 + colecciones.length) % colecciones.length)
  const actual = colecciones[activo]

  return (
    <div data-testid="showroom">
      {/* Móvil: carrusel de una colección */}
      <div className="md:hidden" data-testid="showroom-movil">
        <div
          data-acento={actual.acento}
          className="relative mx-auto aspect-[3/4] max-h-[560px] w-full max-w-sm overflow-hidden rounded-2xl bg-producto-fondo"
        >
          <Image
            key={actual.imagen.src}
            src={actual.imagen.src}
            alt={actual.imagen.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 384px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center">
            <h3 className="font-display text-2xl">{actual.nombre}</h3>
            <p className="text-sm text-texto/90">{actual.descripcion}</p>
            <ul className="text-sm text-suave">
              {nombresDe(actual).map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild variant="primary" size="sm">
                <a href={waBasketMessage('showroom-movil')} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Consultar disponibilidad
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2" data-testid="showroom-controles">
          <Button variant="outline" size="icon" onClick={anterior} aria-label="Colección anterior">
            <ChevronLeft aria-hidden="true" />
          </Button>
          <div className="flex items-center">
            {colecciones.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActivo(i)}
                aria-label={`Ir a ${c.nombre}`}
                aria-current={i === activo}
                className="flex h-11 w-8 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === activo ? 'w-6 bg-brand-gold' : 'w-2 bg-texto/40'
                  }`}
                />
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={siguiente} aria-label="Colección siguiente">
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Escritorio: acordeón horizontal */}
      <div className="hidden h-[600px] gap-2 overflow-hidden rounded-2xl md:flex" data-testid="showroom-escritorio">
        {colecciones.map((coleccion, index) => {
          const esActiva = activo === index
          return (
            <motion.div
              key={coleccion.id}
              data-acento={coleccion.acento}
              initial={false}
              animate={{ width: esActiva ? '65%' : '17.5%' }}
              transition={{ duration: duracion, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActivo(index)}
              onFocus={() => setActivo(index)}
              onClick={() => setActivo(index)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setActivo((index + 1) % colecciones.length)
                if (e.key === 'ArrowLeft') setActivo((index - 1 + colecciones.length) % colecciones.length)
              }}
              className="group relative cursor-pointer overflow-hidden bg-producto-fondo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              tabIndex={0}
              role="group"
              aria-roledescription="panel"
              aria-label={coleccion.nombre}
              aria-current={esActiva}
            >
              <Image
                src={coleccion.imagen.src}
                alt={coleccion.imagen.alt}
                fill
                className={`object-cover transition-[filter] duration-500 ${esActiva ? '' : 'grayscale'}`}
                sizes={esActiva ? '780px' : '210px'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div
                className="relative z-10 flex h-full flex-col justify-end p-6"
                data-center-exempt="acordeon: el panel se expande en horizontal y el texto se ancla al borde izquierdo"
              >
                <h3
                  className={`font-display font-semibold ${esActiva ? 'text-4xl' : 'text-xl [writing-mode:vertical-rl]'}`}
                >
                  {coleccion.nombre}
                </h3>
                {esActiva && (
                  <div className="mt-4 space-y-4">
                    <p className="max-w-xl text-lg text-texto/90">{coleccion.descripcion}</p>
                    <ul className="space-y-1 text-sm text-suave">
                      {nombresDe(coleccion).map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button asChild variant="primary" size="lg">
                        <a href={waBasketMessage('showroom')} target="_blank" rel="noopener noreferrer">
                          <MessageCircle aria-hidden="true" />
                          Consultar disponibilidad
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="bg-fondo/40 backdrop-blur-sm">
                        <Link href="/colecciones">Ver todas</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
