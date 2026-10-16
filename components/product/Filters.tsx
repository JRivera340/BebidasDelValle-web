'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface FiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
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
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Buscar productos</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="Nombre, descripción o etiqueta..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Categoría</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className="min-w-[80px]"
          >
            Todas
          </Button>
          <Button
            variant={selectedCategory === 'vinos' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('vinos')}
            className="min-w-[80px]"
          >
            Vinos
          </Button>
          <Button
            variant={selectedCategory === 'harinas' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('harinas')}
            className="min-w-[80px]"
          >
            Harinas
          </Button>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="available"
          checked={showAvailableOnly}
          onChange={onAvailableToggle}
          className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
        />
        <Label htmlFor="available" className="cursor-pointer">
          Solo disponibles
        </Label>
      </div>

      {/* Clear Filters */}
      {(searchQuery || selectedCategory !== 'all' || showAvailableOnly) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onSearchChange('')
            onCategoryChange('all')
            if (showAvailableOnly) onAvailableToggle()
          }}
          className="w-full"
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}

