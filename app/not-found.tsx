import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-9xl font-bold text-brand-red">404</h1>
        <h2 className="text-3xl font-bold">Página no encontrada</h2>
        <p className="text-lg text-gray-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild variant="primary" size="lg">
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/catalogo">Ver catálogo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

