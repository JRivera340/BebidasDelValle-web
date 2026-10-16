import { test, expect, type Page } from '@playwright/test'

const viewports = [360, 390, 768, 1024, 1280, 1920]
const rutas = ['/', '/catalogo', '/producto/vinifrut-uva', '/colecciones', '/empresa']

// Elementos que deben quedar centrados respecto al viewport (se omiten los marcados con data-center-exempt)
const centrados = ['titular-pagina', 'encabezado-seccion', 'botella-principal', 'cta-hero', 'cta-final', 'ficha-imagen']

async function centroDesviado(page: Page, testid: string) {
  return page.evaluate((id) => {
    const mitad = document.documentElement.clientWidth / 2
    return Array.from(document.querySelectorAll<HTMLElement>(`[data-testid="${id}"]`))
      .filter((el) => !el.closest('[data-center-exempt]') && el.offsetParent !== null)
      .map((el) => {
        const r = el.getBoundingClientRect()
        return { id, desvio: Math.abs(r.left + r.width / 2 - mitad) }
      })
  }, testid)
}

test.describe('layout y centrado', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  for (const ancho of viewports) {
    for (const ruta of rutas) {
      test(`${ruta} a ${ancho}px`, async ({ page }) => {
        await page.setViewportSize({ width: ancho, height: 900 })
        await page.goto(ruta)
        await page.waitForLoadState('load')
        await page.evaluate(() => document.fonts.ready)

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
        expect(overflow, 'desbordamiento horizontal').toBeLessThanOrEqual(0)

        for (const id of centrados) {
          for (const { desvio } of await centroDesviado(page, id)) {
            expect(desvio, `${id} descentrado`).toBeLessThan(2)
          }
        }

        const anchos = await page.evaluate(() =>
          Array.from(document.querySelectorAll<HTMLElement>('.max-w-contenedor')).map((el) => el.getBoundingClientRect().width)
        )
        anchos.forEach((w) => expect(w).toBeLessThanOrEqual(1200.5))

        const margenes = await page.evaluate(() =>
          Array.from(document.querySelectorAll<HTMLElement>('.max-w-contenedor')).map((el) => {
            const cs = getComputedStyle(el)
            return parseFloat(cs.paddingLeft)
          })
        )
        margenes.forEach((m) => expect(m).toBeGreaterThanOrEqual(16))
      })
    }
  }

  test('tarjetas: imagen centrada en su tarjeta, mismo tamaño por fila y última fila centrada', async ({ page }) => {
    for (const ancho of viewports) {
      await page.setViewportSize({ width: ancho, height: 900 })
      await page.goto('/catalogo')
      await page.waitForLoadState('load')
        await page.evaluate(() => document.fonts.ready)

      const datos = await page.evaluate(() => {
        const rect = (el: Element) => el.getBoundingClientRect()
        const imagenes = Array.from(document.querySelectorAll('[data-testid="tarjeta-imagen"]')).map((img) => {
          const tarjeta = img.closest('[data-testid="tarjeta-producto"]')!
          return Math.abs(rect(img).left + rect(img).width / 2 - (rect(tarjeta).left + rect(tarjeta).width / 2))
        })
        const lista = document.querySelector('[data-testid="grid-productos"]')!
        const items = Array.from(lista.children).map((li) => rect(li))
        const filas = new Map<number, DOMRect[]>()
        items.forEach((r) => {
          const clave = Math.round(r.top)
          filas.set(clave, [...(filas.get(clave) ?? []), r])
        })
        const caja = rect(lista)
        const detalle = Array.from(filas.values()).map((fila) => ({
          mismoAncho: new Set(fila.map((r) => Math.round(r.width))).size === 1,
          mismoAlto: new Set(fila.map((r) => Math.round(r.height))).size === 1,
          asimetria: Math.abs(fila[0].left - caja.left - (caja.right - fila[fila.length - 1].right)),
        }))
        return { imagenes, detalle }
      })

      datos.imagenes.forEach((d) => expect(d, `imagen descentrada a ${ancho}`).toBeLessThan(2))
      datos.detalle.forEach((f) => {
        expect(f.mismoAncho).toBe(true)
        expect(f.mismoAlto).toBe(true)
        expect(f.asimetria, `fila descentrada a ${ancho}`).toBeLessThan(2)
      })
    }
  })

  test('controles del carrusel móvil centrados bajo el slide', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const desvio = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="showroom-controles"]') as HTMLElement
      const r = el.getBoundingClientRect()
      return Math.abs(r.left + r.width / 2 - document.documentElement.clientWidth / 2)
    })
    expect(desvio).toBeLessThan(2)
  })

  test('capturas de referencia', async ({ page }) => {
    test.skip(!process.env.VISUAL, 'Solo con VISUAL=1: las capturas dependen del sistema operativo')
    for (const ancho of [390, 1280]) {
      await page.setViewportSize({ width: ancho, height: 900 })
      for (const ruta of rutas) {
        await page.goto(ruta)
        await page.waitForLoadState('load')
        await page.evaluate(() => document.fonts.ready)
        await expect(page).toHaveScreenshot(`${ruta.replace(/\W+/g, '_') || 'home'}-${ancho}.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixelRatio: 0.02,
        })
      }
    }
  })
})
