import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'
import type { Acento } from '@/lib/types'

interface SectionProps {
  id?: string
  titulo?: string
  descripcion?: string
  acento?: Acento
  superficie?: boolean
  className?: string
  children: React.ReactNode
  'aria-labelledby'?: string
}

export function Section({ id, titulo, descripcion, acento, superficie, className, children }: SectionProps) {
  const tituloId = id && titulo ? `${id}-titulo` : undefined
  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      data-acento={acento}
      className={cn('py-[clamp(3rem,7vw,6rem)]', superficie && 'bg-superficie', className)}
    >
      <Container>
        {titulo && (
          <header className="mx-auto mb-10 max-w-prose text-center md:mb-14" data-testid="encabezado-seccion">
            <h2 id={tituloId} className="font-display text-seccion text-balance">
              {titulo}
            </h2>
            {descripcion && <p className="mt-4 text-pretty text-lg text-suave">{descripcion}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
