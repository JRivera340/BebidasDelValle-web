import { Badge } from '@/components/ui/badge'

interface CollectionBadgeProps {
  color: 'red' | 'gold' | 'white'
  name: string
  className?: string
}

export function CollectionBadge({ color, name, className }: CollectionBadgeProps) {
  const colorMap = {
    red: 'bg-brand-red text-white hover:bg-brand-red-hover',
    gold: 'bg-brand-gold text-white hover:bg-brand-gold-hover shimmer-gold',
    white: 'bg-white text-ink border-2 border-gray-200',
  }

  return (
    <Badge className={`${colorMap[color]} ${className}`}>
      {name}
    </Badge>
  )
}

