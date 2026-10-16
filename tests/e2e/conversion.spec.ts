import { test, expect, type BrowserContext } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
const rutas = ['/', '/catalogo', '/colecciones', '/empresa', '/categoria/bebidas', '/producto/vinifrut-uva']

async function interceptarWhatsApp(context: BrowserContext) {
  const pedidos: string[] = []
  await context.route(/wa\.me|whatsapp\.com/, (route) => {
    pedidos.push(route.request().url())
    return route.fulfill({ status: 200, body: '' })
  })
  return pedidos
}

for (const ruta of rutas) {
  test(`carga ${ruta} sin errores de consola ni respuestas fallidas`, async ({ page }) => {
    const errores: string[] = []
    const fallidas: string[] = []
    page.on('pageerror', (e) => errores.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errores.push(m.text()))
    page.on('response', (r) => r.status() >= 400 && fallidas.push(`${r.status()} ${r.url()}`))
    const respuesta = await page.goto(ruta)
    expect(respuesta?.status()).toBe(200)
    await expect(page.locator('h1').first()).toBeVisible()
    expect(errores).toEqual([])
    expect(fallidas).toEqual([])
  })
}

test('home → catálogo → filtro por categoría → ficha', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Ver todos' }).click()
  await expect(page).toHaveURL(/\/catalogo$/)
  await page.getByRole('button', { name: 'Harinas', exact: true }).click()
  await expect(page.getByText(/Mostrando 1 de 5/)).toBeVisible()
  await page.getByRole('link', { name: 'Ver detalles' }).first().click()
  await expect(page).toHaveURL(/\/producto\/la-molienda-natilla$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Natilla Tradicional')
})

test('ficha: el CTA abre wa.me con producto, UTM y ref, y dispara GA4', async ({ page, context }) => {
  const pedidos = await interceptarWhatsApp(context)
  await page.addInitScript(() => {
    const w = window as unknown as { __eventos: unknown[]; gtag: (...a: unknown[]) => void }
    w.__eventos = []
    w.gtag = (...args) => w.__eventos.push(args)
  })
  await page.goto('/producto/vinifrut-uva')
  const cta = page.getByRole('link', { name: /Consultar por WhatsApp/ })
  const href = decodeURIComponent((await cta.getAttribute('href')) ?? '')
  expect(href).toContain('https://wa.me/')
  expect(href).toContain('vinifrut-uva')
  expect(href).toContain('utm_campaign=whatsapp_producto')
  expect(href).toContain('ref=ficha-vinifrut-uva')

  await cta.click()
  await expect.poll(() => pedidos.length).toBeGreaterThan(0)
  const eventos = await page.evaluate(() => (window as unknown as { __eventos: unknown[][] }).__eventos)
  const lead = eventos.find((e) => e[0] === 'event' && e[1] === 'generate_lead')
  expect(lead?.[2]).toMatchObject({ method: 'whatsapp', campaign: 'whatsapp_producto', source: 'ficha-vinifrut-uva' })
})

test('empresa: rechaza menos de 10 unidades y sin ciudad', async ({ page, context }) => {
  const pedidos = await interceptarWhatsApp(context)
  await page.goto('/empresa')
  await page.getByLabel(/Cantidad aproximada/).fill('5')
  await page.getByRole('button', { name: /Solicitar cotización por WhatsApp/ }).click()
  await expect(page.getByTestId('form-cotizacion').getByRole('alert')).toHaveCount(2)
  expect(pedidos).toHaveLength(0)
})

test('empresa: con datos válidos construye el mensaje de volumen', async ({ page, context }) => {
  const pedidos = await interceptarWhatsApp(context)
  await page.goto('/empresa')
  await page.getByLabel(/Cantidad aproximada/).fill('50')
  await page.getByLabel(/Ciudad de entrega/).fill('Cali')
  await page.getByRole('button', { name: /Solicitar cotización por WhatsApp/ }).click()
  await expect.poll(() => pedidos.length).toBeGreaterThan(0)
  const url = decodeURIComponent(pedidos[0])
  expect(url).toContain('wa.me')
  expect(url).toContain('50 unidades')
  expect(url).toContain('Cali')
  expect(url).toContain('ref=empresa-formulario')
})

const redirecciones: Array<[string, string]> = [
  ['/producto/vino-cereza', '/producto/vinifrut-cereza'],
  ['/producto/vino-manzana', '/producto/navifiest-manzana'],
  ['/producto/vino-moscatel', '/producto/vinifrut-uva'],
  ['/producto/harina-natilla', '/producto/la-molienda-natilla'],
  ['/producto/harina-bunuelo', '/catalogo'],
  ['/categoria/vinos', '/categoria/bebidas'],
  ['/categoria/licores', '/categoria/bebidas'],
]

for (const [origen, destino] of redirecciones) {
  test(`redirección permanente ${origen}`, async ({ request }) => {
    const r = await request.get(origen, { maxRedirects: 0 })
    expect([301, 308]).toContain(r.status())
    expect(r.headers()['location']).toBe(destino)
  })
}

test('robots.txt y sitemap.xml usan el dominio configurado', () => {
  const dir = path.join(process.cwd(), 'public')
  expect(fs.readFileSync(path.join(dir, 'robots.txt'), 'utf8')).toContain(SITE)
  expect(fs.readFileSync(path.join(dir, 'sitemap-0.xml'), 'utf8')).toContain(SITE)
})

test('ficha: JSON-LD de producto sin Offer (precio sin confirmar)', async ({ page }) => {
  await page.goto('/producto/vinifrut-uva')
  const bloques = await page.locator('script[type="application/ld+json"]').allTextContents()
  const producto = bloques.map((b) => JSON.parse(b)).find((j) => j['@type'] === 'Product')
  expect(producto.name).toBe('Vinifrut Uva')
  expect(producto.offers).toBeUndefined()
})

test('navegación entre páginas no deja la pantalla en blanco', async ({ page }) => {
  await page.goto('/catalogo')
  await page.getByRole('link', { name: 'Ver detalles' }).first().click()
  await expect(page).toHaveURL(/\/producto\//)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})
