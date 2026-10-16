import { describe, it, expect } from 'vitest'
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'
import { PRODUCTS } from '@/lib/data/products'

describe('seo', () => {
  it('JSON-LD de producto sin precio no incluye price', () => {
    const ld = generateProductJsonLd(PRODUCTS[0])
    expect(ld['@type']).toBe('Product')
    expect(ld.offers).not.toHaveProperty('price')
  })

  it('breadcrumb numera posiciones desde 1', () => {
    const ld = generateBreadcrumbJsonLd([
      { name: 'Inicio', url: '/' },
      { name: 'Catálogo', url: '/catalogo' },
    ])
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2])
  })
})
