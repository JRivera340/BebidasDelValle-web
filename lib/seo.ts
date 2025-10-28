import { Product } from './types'

export const SITE_NAME = 'Bebidas del Valle'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
export const SITE_DESCRIPTION =
  'Selección premium de vinos artesanales y harinas tradicionales. Cestas personalizadas y regalos corporativos.'

export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.variants?.[0]?.sku || product.id,
    offers: {
      '@type': 'Offer',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'COP',
      ...(product.variants?.[0]?.price && { price: product.variants[0].price }),
    },
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
      telephone: '+57-311-3440504',
      contactType: 'customer service',
      availableLanguage: 'es',
    },
  }
}

