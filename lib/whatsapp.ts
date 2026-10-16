export const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573113440504'

function enlace(mensaje: string, campana: string, ref: string) {
  const utm = `utm_source=web&utm_medium=cta&utm_campaign=${campana}&ref=${ref}`
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`${mensaje}\n${utm}`)}`
}

export function waGeneralLink(ref: string) {
  return enlace('Hola, quiero más información.', 'whatsapp_contacto', ref)
}

export function waProductMessage(p: { name: string; slug: string }, ref = 'ficha') {
  return enlace(
    `Hola, me interesa ${p.name} (${p.slug}). ¿Disponibilidad y opciones de presentación?`,
    'whatsapp_producto',
    ref
  )
}

export function waBasketMessage(ref = 'home') {
  return enlace(
    'Hola, me gustaría armar una cesta personalizada. ¿Qué opciones tienen disponibles?',
    'whatsapp_cesta',
    ref
  )
}

export function waVolumeMessage(quantity: string, city: string, ref = 'empresa') {
  return enlace(
    `Hola, necesito cotizar un pedido de ${quantity} unidades para envío a ${city}.`,
    'whatsapp_volumen',
    ref
  )
}
