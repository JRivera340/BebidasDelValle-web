'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import { waProductMessage } from '@/lib/whatsapp'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const waLink = waProductMessage({ name: product.name, slug: product.slug })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:rotate-[-0.4deg]">
        <Link href={`/producto/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badges.map((badge, idx) => (
                <Badge key={idx} variant="gold" className="shadow-lg">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          {!product.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">No disponible</span>
            </div>
          )}
        </Link>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl group-hover:text-brand-red transition-colors">
              {product.name}
            </CardTitle>
            <Badge variant="outline" className="text-xs capitalize shrink-0">
              {product.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          {product.variants && product.variants.length > 0 && (
            <div className="text-sm text-muted-foreground mb-3">
              <span className="font-medium">Presentación:</span> {product.variants[0].name}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 pt-0">
          <Button asChild variant="outline" className="flex-1" size="sm">
            <Link href={`/producto/${product.slug}`}>Ver detalles</Link>
          </Button>
          <Button
            asChild
            variant="primary"
            size="sm"
            className="flex-1 group/btn"
            disabled={!product.available}
          >
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              Consultar
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

