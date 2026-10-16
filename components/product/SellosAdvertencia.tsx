import { cn } from '@/lib/utils'
import type { Sello } from '@/lib/types'

const TEXTO: Record<Sello, string> = {
  azucares: 'Exceso en azúcares',
  sodio: 'Exceso en sodio',
  'grasas-saturadas': 'Exceso en grasas saturadas',
  edulcorantes: 'Contiene edulcorantes',
}

interface SellosAdvertenciaProps {
  sellos: Sello[]
  tamano?: 'sm' | 'md'
  className?: string
}

export function SellosAdvertencia({ sellos, tamano = 'md', className }: SellosAdvertenciaProps) {
  if (sellos.length === 0) return null
  const lado = tamano === 'sm' ? 'h-16 w-16 text-[8px]' : 'h-24 w-24 text-[10px]'

  return (
    <ul aria-label="Sellos de advertencia" className={cn('flex flex-wrap justify-center gap-2', className)}>
      {sellos.map((sello) => (
        <li key={sello} data-testid="sello" className={cn('sello-octogono bg-texto', lado)}>
          <div
            role="img"
            aria-label={`${TEXTO[sello]}, Minsalud`}
            className="sello-octogono m-[2px] flex h-[calc(100%-4px)] w-[calc(100%-4px)] flex-col items-center justify-center bg-black px-2 text-center font-bold uppercase leading-tight text-texto"
          >
            <span>{TEXTO[sello]}</span>
            <span className="mt-1 font-semibold opacity-80">Minsalud</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
