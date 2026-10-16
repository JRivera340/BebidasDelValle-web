import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { MobileMenu } from '@/components/layout/MobileMenu'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/colecciones', label: 'Colecciones' },
  { href: '/empresa', label: 'Empresa' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-fondo/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-center gap-10">
        <Link href="/" className="font-display text-xl text-brand-gold md:text-2xl" data-testid="logo">
          Bebidas del Valle
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex" aria-label="Principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-suave transition-colors hover:text-texto">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute right-4 md:hidden">
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
