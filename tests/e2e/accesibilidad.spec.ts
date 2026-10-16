import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const rutas = ['/', '/catalogo', '/colecciones', '/empresa', '/categoria/bebidas', '/producto/navifiest-manzana']

for (const ruta of rutas) {
  test(`axe sin violaciones críticas ni serias en ${ruta}`, async ({ page }) => {
    await page.goto(ruta)
    await page.waitForLoadState('load')
        await page.evaluate(() => document.fonts.ready)
    const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    const graves = resultado.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
    expect(
      graves.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)
    ).toEqual([])
  })
}

test('con prefers-reduced-motion no hay transiciones largas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/catalogo')
  const duraciones = await page.evaluate(() =>
    ['[data-testid="tarjeta-producto"]', 'a', 'button'].flatMap((sel) =>
      Array.from(document.querySelectorAll(sel)).map((el) => {
        const cs = getComputedStyle(el)
        return [cs.transitionDuration, cs.animationDuration]
          .flatMap((d) => d.split(','))
          .map((d) => (d.trim().endsWith('ms') ? parseFloat(d) / 1000 : parseFloat(d)))
      })
    ).flat()
  )
  duraciones.forEach((d) => expect(d).toBeLessThanOrEqual(0.001))
})

test('foco visible: el primer tabulador es el enlace para saltar al contenido', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const activo = page.locator(':focus')
  await expect(activo).toHaveText('Saltar al contenido')
  await expect(activo).toBeVisible()
})

test('menú móvil: abre, cierra con Escape y devuelve el foco', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'El menú solo existe en móvil')
  await page.goto('/')
  const abrir = page.getByRole('button', { name: 'Abrir menú' })
  await abrir.click()
  const menu = page.getByRole('dialog')
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('link')).toHaveCount(5)
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(abrir).toBeFocused()
})

test('acordeón: se navega con el teclado', async ({ page, isMobile }) => {
  test.skip(isMobile, 'El acordeón horizontal es de escritorio')
  await page.goto('/')
  const paneles = page.locator('[data-testid="showroom-escritorio"] [role="group"]')
  await paneles.nth(0).focus()
  await page.keyboard.press('ArrowRight')
  await expect(paneles.nth(1)).toHaveAttribute('aria-current', 'true')
})
