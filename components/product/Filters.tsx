'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CATEGORIAS } from '@/lib/data/products'
import type { Categoria } from '@/lib/types'

export type CategoriaSeleccionada = Categoria | 'todas'

interface FiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedCategory: CategoriaSeleccionada
  onCategoryChange: (value: CategoriaSeleccionada) => void
  showAvailableOnly: boolean
  onAvailableToggle: () => void
}

export function Filters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showAvailableOnly,
  onAvailableToggle,
}: FiltersProps) {
  const opciones: Array<{ valor: CategoriaSeleccionada; nombre: string }> = [
    { valor: 'todas', nombre: 'Todas' },
    ...(Object.entries(CATEGORIAS) as Array<[Categoria, { nombre: string }]>).map(([valor, c]) => ({
      valor,
      nombre: c.nombre,
    })),
  ]
  const hayFiltros = searchQuery !== '' || selectedCategory !== 'todas' || showAvailableOnly

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 rounded-2xl border border-border bg-superficie p-5 text-center shadow-card">
      <div className="space-y-2">
        <Label htmlFor="search">Buscar productos</Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-suave"
            aria-hidden="true"
          />
          <Input
            id="search"
            type="search"
            placeholder="Nombre, línea o descripción"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label id="filtro-categoria">Categoría</Label>
        <div role="group" aria-labelledby="filtro-categoria" className="flex flex-wrap justify-center gap-2">
          {opciones.map((o) => (
            <Button
              key={o.valor}
              variant={selectedCategory === o.valor ? 'primary' : 'outline'}
              size="sm"
              aria-pressed={selectedCategory === o.valor}
              onClick={() => onCategoryChange(o.valor)}
              className="min-w-[88px]"
            >
              {o.nombre}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <label htmlFor="available" className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            id="available"
            checked={showAvailableOnly}
            onChange={onAvailableToggle}
            className="h-5 w-5 accent-[rgb(var(--oro))]"
          />
          Solo disponibles
        </label>
        {hayFiltros && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange('')
              onCategoryChange('todas')
              if (showAvailableOnly) onAvailableToggle()
            }}
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}
