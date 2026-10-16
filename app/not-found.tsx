import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-display text-8xl text-brand-gold">404</p>
      <h1 className="mt-4 font-display text-seccion">Página no encontrada</h1>
      <p className="mx-auto mt-4 max-w-prose text-lg text-suave">
        La página que buscas no existe o fue movida.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="primary" size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/catalogo">Ver catálogo</Link>
        </Button>
      </div>
    </Container>
  )
}
