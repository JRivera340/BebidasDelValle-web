import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo'
import Script from 'next/script'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-brand-red">Bebidas del Valle</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-brand-red">
            Inicio
          </Link>
          <Link href="/catalogo" className="transition-colors hover:text-brand-red">
            Catálogo
          </Link>
          <Link href="/colecciones" className="transition-colors hover:text-brand-red">
            Colecciones
          </Link>
          <Link href="/empresa" className="transition-colors hover:text-brand-red">
            Empresa
          </Link>
        </nav>
        <div className="md:hidden">
          <button className="text-brand-red">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-brand-red">Bebidas del Valle</h3>
            <p className="text-sm text-gray-600">
              Selección premium de vinos artesanales y harinas tradicionales.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/catalogo" className="hover:text-brand-red transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/colecciones" className="hover:text-brand-red transition-colors">
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="hover:text-brand-red transition-colors">
                  Pedidos corporativos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categorías</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/categoria/vinos" className="hover:text-brand-red transition-colors">
                  Vinos
                </Link>
              </li>
              <li>
                <Link href="/categoria/harinas" className="hover:text-brand-red transition-colors">
                  Harinas
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <p className="text-sm text-gray-600">
              WhatsApp: +57 311 344 0504
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

