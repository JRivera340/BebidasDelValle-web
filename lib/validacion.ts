import { z } from 'zod'

// TODO(D4): confirmar el pedido mínimo para cotización corporativa
export const PEDIDO_MINIMO = 10

export const esquemaCotizacion = z.object({
  cantidad: z.coerce
    .number({ invalid_type_error: 'Indica la cantidad de unidades' })
    .int('La cantidad debe ser un número entero')
    .min(PEDIDO_MINIMO, `El pedido mínimo es de ${PEDIDO_MINIMO} unidades`),
  ciudad: z.string().trim().min(2, 'Indica la ciudad de entrega').max(80),
})

export type Cotizacion = z.infer<typeof esquemaCotizacion>
