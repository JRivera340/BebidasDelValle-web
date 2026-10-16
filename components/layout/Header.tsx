import Link from 'next/link'
import { MobileMenu } from '@/components/layout/MobileMenu'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/colecciones', label: 'Colecciones' },
  { href: '/empresa', label: 'Empresa' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold text-brand-red">Bebidas del Valle</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium" aria-label="Principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-brand-red">
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}
