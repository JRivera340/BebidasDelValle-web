'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { esquemaCotizacion, PEDIDO_MINIMO } from '@/lib/validacion'
import { waVolumeMessage } from '@/lib/whatsapp'
import { trackVolumeQuote } from '@/lib/analytics'

type Errores = Partial<Record<'cantidad' | 'ciudad', string>>

export function CotizacionForm() {
  const [cantidad, setCantidad] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [errores, setErrores] = useState<Errores>({})

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const resultado = esquemaCotizacion.safeParse({ cantidad, ciudad })
    if (!resultado.success) {
      const campos = resultado.error.flatten().fieldErrors
      setErrores({ cantidad: campos.cantidad?.[0], ciudad: campos.ciudad?.[0] })
      return
    }
    setErrores({})
    const { cantidad: n, ciudad: c } = resultado.data
    trackVolumeQuote(String(n), c)
    window.open(waVolumeMessage(String(n), c, 'empresa-formulario'), '_blank', 'noopener,noreferrer')
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-border bg-superficie p-6 text-left shadow-card md:p-8"
      data-testid="form-cotizacion"
    >
      <div className="space-y-2">
        <Label htmlFor="cantidad">Cantidad aproximada de unidades</Label>
        <Input
          id="cantidad"
          type="number"
          inputMode="numeric"
          min={PEDIDO_MINIMO}
          placeholder={`Mínimo ${PEDIDO_MINIMO}`}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          aria-invalid={Boolean(errores.cantidad)}
          aria-describedby={errores.cantidad ? 'error-cantidad' : undefined}
          className="h-11"
        />
        {errores.cantidad && (
          <p id="error-cantidad" role="alert" className="text-sm text-red-300">
            {errores.cantidad}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="ciudad">Ciudad de entrega</Label>
        <Input
          id="ciudad"
          type="text"
          placeholder="Ej: Bogotá"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          aria-invalid={Boolean(errores.ciudad)}
          aria-describedby={errores.ciudad ? 'error-ciudad' : undefined}
          className="h-11"
        />
        {errores.ciudad && (
          <p id="error-ciudad" role="alert" className="text-sm text-red-300">
            {errores.ciudad}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" variant="primary" className="w-full">
        <MessageCircle aria-hidden="true" />
        Solicitar cotización por WhatsApp
      </Button>
    </form>
  )
}
