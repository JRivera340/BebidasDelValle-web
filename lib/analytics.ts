// Google Analytics 4 Event Tracking

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'

// Types
interface EventParams {
  [key: string]: string | number | boolean
}

// Helper to send GA4 events
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params)
  }
}

// Specific event trackers

export function trackWhatsAppClick(productSlug: string, productName: string, source: string) {
  trackEvent('generate_lead', {
    product_slug: productSlug,
    product_name: productName,
    source: source,
    method: 'whatsapp',
  })
}

export function trackProductView(productSlug: string, productName: string, category: string) {
  trackEvent('view_item', {
    product_slug: productSlug,
    product_name: productName,
    category: category,
  })
}

export function trackBasketStart() {
  trackEvent('begin_checkout', {
    checkout_type: 'custom_basket',
  })
}

export function trackVolumeQuote(quantity: string, city: string) {
  trackEvent('generate_lead', {
    lead_type: 'volume_quote',
    quantity: quantity,
    city: city,
  })
}

export function trackCollectionInterest(collectionName: string) {
  trackEvent('select_content', {
    content_type: 'collection',
    content_id: collectionName,
  })
}

