'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Package, Layers, Briefcase } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

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
          <Menu className="h-6 w-6 text-brand-red" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-brand-red text-xl">Bebidas del Valle</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <Icon className="h-5 w-5 text-brand-red group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium group-hover:text-brand-red transition-colors">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-8 left-6 right-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center space-y-2">
            <p className="text-sm text-gray-600">¿Necesitas ayuda?</p>
            <Button asChild variant="primary" size="sm" className="w-full">
              <a href="https://wa.me/573113440504" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

