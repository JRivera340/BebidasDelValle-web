import { describe, it, expect } from 'vitest'
import { waProductMessage, waBasketMessage, waVolumeMessage, PHONE } from '@/lib/whatsapp'

function parse(url: string) {
  const u = new URL(url)
  return { host: u.host, path: u.pathname, text: decodeURIComponent(u.searchParams.get('text') ?? '') }
}

describe('whatsapp', () => {
  it('producto: apunta a wa.me con el número y menciona el producto', () => {
    const r = parse(waProductMessage({ name: 'Vino de Cereza', slug: 'vino-cereza' }))
    expect(r.host).toBe('wa.me')
    expect(r.path).toBe(`/${PHONE}`)
    expect(r.text).toContain('Vino de Cereza')
    expect(r.text).toContain('vino-cereza')
    expect(r.text).toContain('utm_campaign=whatsapp_producto')
  })

  it('cesta: incluye UTM de cesta', () => {
    expect(parse(waBasketMessage()).text).toContain('utm_campaign=whatsapp_cesta')
  })

  it('volumen: incluye cantidad, ciudad y UTM', () => {
    const r = parse(waVolumeMessage('50', 'Medellín'))
    expect(r.text).toContain('50 unidades')
    expect(r.text).toContain('Medellín')
    expect(r.text).toContain('utm_campaign=whatsapp_volumen')
  })

  it('codifica caracteres especiales', () => {
    const url = waVolumeMessage('10', 'Cúcuta & Cía')
    expect(url).not.toContain(' ')
    expect(url).not.toContain('&C')
    expect(parse(url).text).toContain('Cúcuta & Cía')
  })
})
