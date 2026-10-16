import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface EncabezadoPaginaProps {
  titulo: string
  descripcion?: string
  eyebrow?: string
  className?: string
  children?: React.ReactNode
}

export function EncabezadoPagina({ titulo, descripcion, eyebrow, className, children }: EncabezadoPaginaProps) {
  return (
    <header className={cn('border-b border-border bg-superficie py-[clamp(3rem,7vw,5.5rem)]', className)}>
      <Container className="text-center">
        {eyebrow && <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-gold">{eyebrow}</p>}
        <h1 className="mx-auto max-w-3xl font-display text-seccion text-balance" data-testid="titular-pagina">
          {titulo}
        </h1>
        {descripcion && <p className="mx-auto mt-4 max-w-prose text-pretty text-lg text-suave">{descripcion}</p>}
        {children}
      </Container>
    </header>
  )
}
