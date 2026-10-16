import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  PRODUCTOS,
  CATEGORIAS,
  LINEAS,
  filtrarProductos,
  getProductoPorSlug,
  getProductosPorCategoria,
} from '@/lib/data/products'
import { COLECCIONES } from '@/lib/data/collections'

const PALABRAS_PROHIBIDAS = ['navid', 'aguinaldo', 'novena']

function textosVisibles() {
  const productos = PRODUCTOS.flatMap((p) => [
    p.nombre,
    p.descripcion,
    ...p.imagenes.map((i) => i.alt),
    ...p.presentaciones.map((x) => x.tamano),
  ])
  const colecciones = COLECCIONES.flatMap((c) => [c.nombre, c.descripcion, c.imagen.alt])
  const categorias = Object.values(CATEGORIAS).flatMap((c) => [c.nombre, c.descripcion])
  return [...productos, ...colecciones, ...categorias, ...Object.values(LINEAS)]
}

describe('catálogo', () => {
  it('slugs únicos y válidos', () => {
    const slugs = PRODUCTOS.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('cada producto tiene imágenes existentes con alt', () => {
    for (const p of PRODUCTOS) {
      expect(p.imagenes.length).toBeGreaterThan(0)
      for (const img of p.imagenes) {
        expect(img.alt.trim()).not.toBe('')
        expect(fs.existsSync(path.join(process.cwd(), 'public', img.src))).toBe(true)
      }
    }
  })

  it('todo producto declara al menos un sello', () => {
    PRODUCTOS.forEach((p) => expect(p.sellos.length).toBeGreaterThan(0))
  })

  it('no muestra precio si no está confirmado', () => {
    for (const p of PRODUCTOS) {
      if (!p.datosConfirmados.precio) expect(p.precio).toBeUndefined()
    }
  })

  it('las colecciones referencian productos existentes', () => {
    for (const c of COLECCIONES) {
      c.productos.forEach((slug) => expect(getProductoPorSlug(slug)).toBeDefined())
    }
  })

  it('los textos visibles no usan lenguaje festivo', () => {
    for (const texto of textosVisibles()) {
      const t = texto.toLowerCase()
      PALABRAS_PROHIBIDAS.forEach((palabra) => expect(t).not.toContain(palabra))
    }
  })

  it('los textos visibles no usan la palabra vino', () => {
    // TODO(D1): retirar esta prueba cuando el cliente confirme el nombre de la categoría
    for (const texto of textosVisibles()) {
      expect(texto.toLowerCase()).not.toMatch(/\bvinos?\b/)
    }
  })

  it('consulta por slug y por categoría', () => {
    expect(getProductoPorSlug('vinifrut-uva')?.nombre).toBe('Uva')
    expect(getProductoPorSlug('no-existe')).toBeUndefined()
    expect(getProductosPorCategoria('bebidas').length).toBe(3)
  })
})

describe('filtrarProductos', () => {
  it('busca por nombre, línea y descripción', () => {
    expect(filtrarProductos({ texto: 'cereza' }).map((p) => p.slug)).toContain('vinifrut-cereza')
    expect(filtrarProductos({ texto: 'molienda' }).map((p) => p.slug)).toEqual(['la-molienda-natilla'])
    expect(filtrarProductos({ texto: 'mezcla en polvo' }).length).toBeGreaterThan(0)
  })

  it('filtra por categoría', () => {
    const r = filtrarProductos({ categoria: 'panaderia' })
    expect(r.map((p) => p.slug)).toEqual(['torti-valle-torta'])
  })

  it('"todas" y texto vacío devuelven todo el catálogo', () => {
    expect(filtrarProductos({ categoria: 'todas', texto: '  ' })).toHaveLength(PRODUCTOS.length)
  })

  it('solo disponibles excluye los no disponibles', () => {
    const lista = [{ ...PRODUCTOS[0], disponible: false }, PRODUCTOS[1]]
    expect(filtrarProductos({ soloDisponibles: true }, lista)).toHaveLength(1)
  })
})
