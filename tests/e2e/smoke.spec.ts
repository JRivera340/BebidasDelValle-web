import { test, expect } from '@playwright/test'

const rutas = ['/', '/catalogo', '/colecciones', '/empresa', '/categoria/vinos', '/producto/vino-cereza']

for (const ruta of rutas) {
  test(`carga ${ruta} sin errores`, async ({ page }) => {
    const errores: string[] = []
    page.on('pageerror', (e) => errores.push(e.message))
    const respuesta = await page.goto(ruta)
    expect(respuesta?.status()).toBe(200)
    await expect(page.locator('h1').first()).toBeVisible()
    expect(errores).toEqual([])
  })
}

test('catálogo: filtra por categoría y abre una ficha', async ({ page }) => {
  await page.goto('/catalogo')
  await page.getByRole('button', { name: 'Harinas' }).click()
  await expect(page.getByText(/Mostrando 3 de/)).toBeVisible()
  await page.getByRole('link', { name: 'Ver detalles' }).first().click()
  await expect(page).toHaveURL(/\/producto\/harina-/)
})

test('ficha: el CTA apunta a wa.me con UTM', async ({ page }) => {
  await page.goto('/producto/vino-cereza')
  const href = await page
    .getByRole('link', { name: /Consultar por WhatsApp/ })
    .first()
    .getAttribute('href')
  expect(href).toContain('https://wa.me/')
  expect(decodeURIComponent(href!)).toContain('utm_campaign=whatsapp_producto')
})

test('empresa: abre WhatsApp con cantidad y ciudad', async ({ page, context }) => {
  const pedidos: string[] = []
  await context.route(/wa\.me|whatsapp\.com/, (route) => {
    pedidos.push(route.request().url())
    return route.fulfill({ status: 200, body: '' })
  })
  await page.goto('/empresa')
  await page.getByLabel(/Cantidad aproximada/).fill('50')
  await page.getByLabel(/Ciudad de entrega/).fill('Cali')
  await page.getByRole('button', { name: /Solicitar cotización por WhatsApp/ }).click()
  await expect.poll(() => pedidos.length).toBeGreaterThan(0)
  const url = decodeURIComponent(pedidos[0])
  expect(url).toContain('wa.me')
  expect(url).toContain('50 unidades')
  expect(url).toContain('Cali')
})
