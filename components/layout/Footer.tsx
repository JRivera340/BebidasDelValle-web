import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SITE_NAME } from '@/lib/seo'
import { CATEGORIAS } from '@/lib/data/products'
import { waGeneralLink, PHONE } from '@/lib/whatsapp'

function telefonoLegible(numero: string) {
  const m = /^57(\d{3})(\d{3})(\d{4})$/.exec(numero)
  return m ? `+57 ${m[1]} ${m[2]} ${m[3]}` : `+${numero}`
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-superficie">
      <Container className="py-12 text-center">
        <p className="font-display text-2xl text-brand-gold">{SITE_NAME}</p>
        <nav aria-label="Pie de página" className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-suave">
          <Link href="/catalogo" className="py-2 hover:text-texto">Catálogo</Link>
          <Link href="/colecciones" className="py-2 hover:text-texto">Colecciones</Link>
          <Link href="/empresa" className="py-2 hover:text-texto">Pedidos corporativos</Link>
          {Object.entries(CATEGORIAS).map(([slug, c]) => (
            <Link key={slug} href={`/categoria/${slug}`} className="py-2 hover:text-texto">
              {c.nombre}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-sm text-suave">
          WhatsApp:{' '}
          <a
            href={waGeneralLink('pie')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 text-texto underline underline-offset-4"
          >
            {telefonoLegible(PHONE)}
          </a>
        </p>
        <p className="mt-8 border-t border-border pt-6 text-sm text-suave">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  )
}
