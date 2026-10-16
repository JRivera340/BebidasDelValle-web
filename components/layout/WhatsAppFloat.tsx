import { MessageCircle } from 'lucide-react'
import { waGeneralLink } from '@/lib/whatsapp'

export function WhatsAppFloat() {
  return (
    <a
      href={waGeneralLink('flotante')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-texto shadow-card transition-colors hover:bg-brand-red-hover md:hidden"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  )
}
