import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { PRODUCTS, COLLECTIONS, getProductBySlug, getProductsByCategory } from '@/lib/products'

describe('catálogo', () => {
  it('slugs únicos y válidos', () => {
    const slugs = PRODUCTS.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('cada producto tiene imagen existente', () => {
    for (const p of PRODUCTS) {
      expect(p.images.length).toBeGreaterThan(0)
      for (const img of p.images) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', img))).toBe(true)
      }
    }
  })

  it('las colecciones referencian productos existentes', () => {
    for (const c of COLLECTIONS) {
      for (const id of c.products) {
        expect(PRODUCTS.some((p) => p.id === id)).toBe(true)
      }
    }
  })

  it('búsqueda por slug y por categoría', () => {
    expect(getProductBySlug('vino-cereza')?.name).toBe('Vino de Cereza')
    expect(getProductBySlug('no-existe')).toBeUndefined()
    expect(getProductsByCategory('vinos').length).toBeGreaterThan(0)
  })
})
