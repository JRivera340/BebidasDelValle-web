import Link from 'next/link'
import { SITE_NAME } from '@/lib/seo'

export function Footer() {
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
            <p className="text-sm text-gray-600">WhatsApp: +57 311 344 0504</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
