import { Product, Collection, Category } from './types'

export const PRODUCTS: Product[] = [
  {
    id: 'vino-cereza',
    slug: 'vino-cereza',
    name: 'Vino de Cereza',
    category: 'vinos',
    variants: [{ name: '750 ml', sku: 'CER-750' }],
    description:
      'Aromas frutales intensos y elegantes. Nuestra selección de temporada, ideal para obsequios corporativos y cestas personalizadas.',
    tags: ['selección', 'obsequio'],
    images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop&q=80'],
    available: true,
    badges: ['Edición especial'],
  },
  {
    id: 'vino-manzana',
    slug: 'vino-manzana',
    name: 'Vino de Manzana',
    category: 'vinos',
    variants: [{ name: '750 ml', sku: 'MAN-750' }],
    description:
      'Equilibrado y fresco, con notas cítricas. Presentación premium para regalo, perfecto para ocasiones especiales.',
    tags: ['selección'],
    images: ['https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop&q=80'],
    available: true,
  },
  {
    id: 'vino-moscatel',
    slug: 'vino-moscatel',
    name: 'Vino Moscatel',
    category: 'vinos',
    variants: [{ name: '750 ml', sku: 'MOS-750' }],
    description:
      'Perfil aromático dulce y envolvente. Recomendado para cestas personalizadas y regalos corporativos.',
    tags: ['obsequio'],
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop&q=80'],
    available: true,
  },
  {
    id: 'harina-natilla',
    slug: 'harina-natilla',
    name: 'Harina para Natilla',
    category: 'harinas',
    variants: [{ name: '500 g', sku: 'NAT-500' }],
    description:
      'Mezcla tradicional para postres cremosos. Presentación lista para regalo, ideal para complementar cestas.',
    tags: ['tradicional'],
    images: ['https://images.unsplash.com/photo-1549888834-3ec93abae044?w=800&h=600&fit=crop&q=80'],
    available: true,
  },
  {
    id: 'harina-bunuelo',
    slug: 'harina-bunuelo',
    name: 'Harina para Buñuelo',
    category: 'harinas',
    variants: [{ name: '500 g', sku: 'BUN-500' }],
    description:
      'Textura crujiente garantizada. Selección especial para obsequios y pedidos corporativos.',
    tags: ['selección'],
    images: ['https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop&q=80'],
    available: true,
  },
  {
    id: 'harina-arequipe',
    slug: 'harina-arequipe',
    name: 'Harina sabor Arequipe',
    category: 'harinas',
    variants: [{ name: '500 g', sku: 'ARE-500' }],
    description:
      'Sabor clásico y auténtico. Ideal para combinar en cestas personalizadas y regalos de empresa.',
    tags: ['clásico'],
    images: ['https://images.unsplash.com/photo-1517686748-7ae0be4a4a8a?w=800&h=600&fit=crop&q=80'],
    available: true,
  },
]

export const COLLECTIONS: Collection[] = [
  {
    id: 'rojo-clasico',
    name: 'Colección Rojo Clásico',
    color: 'red',
    description: 'Selección tradicional de nuestros vinos más apreciados',
    features: ['Vino de Cereza', 'Presentación premium', 'Disponible inmediato'],
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&h=800&fit=crop&q=80',
    products: ['vino-cereza'],
  },
  {
    id: 'dorado-premium',
    name: 'Colección Dorado Premium',
    color: 'gold',
    description: 'Experiencia única para los paladares más exigentes',
    features: ['Vino Moscatel', 'Edición limitada', 'Entrega 24-48h'],
    image: 'https://images.unsplash.com/photo-1474722883778-ab3ea2dd0f9d?w=1200&h=800&fit=crop&q=80',
    products: ['vino-moscatel', 'harina-arequipe'],
  },
  {
    id: 'blanco-esencial',
    name: 'Colección Blanco Esencial',
    color: 'white',
    description: 'Sabores equilibrados y versátiles para toda ocasión',
    features: ['Vino de Manzana', 'Harinas tradicionales', 'Disponible todo el año'],
    image: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?w=1200&h=800&fit=crop&q=80',
    products: ['vino-manzana', 'harina-natilla', 'harina-bunuelo'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  )
}

