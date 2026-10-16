import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  items: Array<{ nombre: string; href?: string }>
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-8">
      <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-suave">
        {items.map((item, i) => {
          const ultimo = i === items.length - 1
          return (
            <li key={item.nombre} className="flex items-center gap-2">
              {item.href && !ultimo ? (
                <Link href={item.href} className="inline-block py-2 hover:text-texto">
                  {item.nombre}
                </Link>
              ) : (
                <span aria-current={ultimo ? 'page' : undefined} className={ultimo ? 'text-brand-gold' : undefined}>
                  {item.nombre}
                </span>
              )}
              {!ultimo && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
