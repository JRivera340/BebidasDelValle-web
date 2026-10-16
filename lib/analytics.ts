// Seguimiento de eventos de Google Analytics 4

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

type EventParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventParams) => void
  }
}

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export function trackWhatsAppClick(productSlug: string, productName: string, source: string) {
  trackEvent('generate_lead', {
    product_slug: productSlug,
    product_name: productName,
    source,
    method: 'whatsapp',
  })
}

export function trackProductView(productSlug: string, productName: string, category: string) {
  trackEvent('view_item', {
    product_slug: productSlug,
    product_name: productName,
    category,
  })
}

export function trackBasketStart(source: string) {
  trackEvent('begin_checkout', {
    checkout_type: 'custom_basket',
    source,
  })
}

export function trackVolumeQuote(quantity: string, city: string) {
  trackEvent('generate_lead', {
    lead_type: 'volume_quote',
    quantity,
    city,
  })
}

export function trackCollectionInterest(collectionName: string) {
  trackEvent('select_content', {
    content_type: 'collection',
    content_id: collectionName,
  })
}
