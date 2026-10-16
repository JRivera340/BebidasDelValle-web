import { describe, it, expect } from 'vitest'
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'
import { PRODUCTOS } from '@/lib/data/products'

describe('seo', () => {
  it('JSON-LD de producto sin precio confirmado no incluye Offer', () => {
    const ld = generateProductJsonLd(PRODUCTOS[0])
    expect(ld['@type']).toBe('Product')
    expect(ld).not.toHaveProperty('offers')
  })

  it('JSON-LD incluye Offer solo con precio confirmado', () => {
    const conPrecio = {
      ...PRODUCTOS[0],
      precio: 25000,
      datosConfirmados: { ...PRODUCTOS[0].datosConfirmados, precio: true },
    }
    const ld = generateProductJsonLd(conPrecio)
    expect(ld).toHaveProperty('offers.price', 25000)
    expect(ld).toHaveProperty('offers.priceCurrency', 'COP')
  })

  it('breadcrumb numera posiciones desde 1', () => {
    const ld = generateBreadcrumbJsonLd([
      { name: 'Inicio', url: '/' },
      { name: 'Catálogo', url: '/catalogo' },
    ])
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2])
  })
})
