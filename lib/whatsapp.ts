export const PHONE = '573113440504' // Reemplazar por el número correcto con 57

export function waProductMessage(p: { name: string; slug: string }) {
  const msg = encodeURIComponent(
    `Hola, me interesa ${p.name} (${p.slug}). ¿Disponibilidad y opciones de presentación?`
  )
  const utm = encodeURIComponent('utm_source=web&utm_medium=cta&utm_campaign=whatsapp_producto')
  return `https://wa.me/${PHONE}?text=${msg}%0A${utm}`
}

export function waBasketMessage() {
  const msg = encodeURIComponent('Hola, me gustaría armar una cesta personalizada. ¿Qué opciones tienen disponibles?')
  const utm = encodeURIComponent('utm_source=web&utm_medium=cta&utm_campaign=whatsapp_cesta')
  return `https://wa.me/${PHONE}?text=${msg}%0A${utm}`
}

export function waVolumeMessage(quantity: string, city: string) {
  const msg = encodeURIComponent(
    `Hola, necesito cotizar un pedido de ${quantity} unidades para envío a ${city}.`
  )
  const utm = encodeURIComponent('utm_source=web&utm_medium=cta&utm_campaign=whatsapp_volumen')
  return `https://wa.me/${PHONE}?text=${msg}%0A${utm}`
}

