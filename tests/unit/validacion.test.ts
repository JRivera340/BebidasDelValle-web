import { describe, it, expect } from 'vitest'
import { esquemaCotizacion, PEDIDO_MINIMO } from '@/lib/validacion'

describe('cotización corporativa', () => {
  it.each([
    ['9', false],
    ['10', true],
    ['49', true],
    ['200', true],
    ['', false],
    ['abc', false],
    ['10.5', false],
  ])('cantidad %s -> válida: %s', (cantidad, valida) => {
    expect(esquemaCotizacion.safeParse({ cantidad, ciudad: 'Cali' }).success).toBe(valida)
  })

  it('exige la ciudad', () => {
    expect(esquemaCotizacion.safeParse({ cantidad: '50', ciudad: ' ' }).success).toBe(false)
    expect(esquemaCotizacion.safeParse({ cantidad: '50', ciudad: 'Bogotá' }).success).toBe(true)
  })

  it('el mínimo es 10', () => {
    expect(PEDIDO_MINIMO).toBe(10)
  })
})
