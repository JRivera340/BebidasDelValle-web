'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Home, Package, Layers, Briefcase } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { waGeneralLink } from '@/lib/whatsapp'

const menuItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/catalogo', label: 'Catálogo', icon: Package },
  { href: '/colecciones', label: 'Colecciones', icon: Layers },
  { href: '/empresa', label: 'Empresa', icon: Briefcase },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-brand-gold" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="font-display text-xl text-brand-gold">Bebidas del Valle</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2" aria-label="Menú móvil">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex min-h-11 items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-accent"
              >
                <Icon className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-8 left-6 right-6 space-y-2 rounded-lg bg-accent p-4 text-center">
          <p className="text-sm text-suave">¿Necesitas ayuda?</p>
          <Button asChild variant="primary" size="sm" className="w-full">
            <a href={waGeneralLink('menu-movil')} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
