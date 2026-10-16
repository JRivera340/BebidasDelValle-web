import type { Producto } from './types'
import { LINEAS, nombreCompleto } from './data/products'
import { PHONE } from './whatsapp'

export const SITE_NAME = 'Bebidas del Valle'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '')
export const SITE_DESCRIPTION =
  'Bebidas sin alcohol, mezclas para postres y tortas de temporada. Cestas personalizadas y regalos corporativos.'

export function generateProductJsonLd(producto: Producto) {
  const conPrecio = producto.datosConfirmados.precio && typeof producto.precio === 'number'
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: nombreCompleto(producto),
    description: producto.descripcion,
    image: producto.imagenes.map((img) => `${SITE_URL}${img.src}`),
    brand: { '@type': 'Brand', name: LINEAS[producto.linea] },
    url: `${SITE_URL}/producto/${producto.slug}`,
    ...(conPrecio && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'COP',
        price: producto.precio,
        availability: producto.disponible
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
    }),
  }
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${PHONE}`,
      contactType: 'customer service',
      availableLanguage: 'es',
    },
  }
}
