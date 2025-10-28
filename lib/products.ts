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
    images: ['https://via.placeholder.com/800x600/B11E2F/FFFFFF?text=Vino+de+Cereza+750ml'],
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
    images: ['https://via.placeholder.com/800x600/C8A349/FFFFFF?text=Vino+de+Manzana+750ml'],
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
    images: ['https://via.placeholder.com/800x600/9A1A29/FFFFFF?text=Vino+Moscatel+750ml'],
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
    images: ['https://via.placeholder.com/800x600/F5E6D3/1F2937?text=Harina+Natilla+500g'],
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
    images: ['https://via.placeholder.com/800x600/E5C76A/1F2937?text=Harina+Bunuelo+500g'],
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
    images: ['https://via.placeholder.com/800x600/B28F3F/FFFFFF?text=Harina+Arequipe+500g'],
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
    image: 'https://via.placeholder.com/1200x800/B11E2F/FFFFFF?text=Coleccion+Rojo+Clasico',
    products: ['vino-cereza'],
  },
  {
    id: 'dorado-premium',
    name: 'Colección Dorado Premium',
    color: 'gold',
    description: 'Experiencia única para los paladares más exigentes',
    features: ['Vino Moscatel', 'Edición limitada', 'Entrega 24-48h'],
    image: 'https://via.placeholder.com/1200x800/C8A349/FFFFFF?text=Coleccion+Dorado+Premium',
    products: ['vino-moscatel', 'harina-arequipe'],
  },
  {
    id: 'blanco-esencial',
    name: 'Colección Blanco Esencial',
    color: 'white',
    description: 'Sabores equilibrados y versátiles para toda ocasión',
    features: ['Vino de Manzana', 'Harinas tradicionales', 'Disponible todo el año'],
    image: 'https://via.placeholder.com/1200x800/F9FAFB/1F2937?text=Coleccion+Blanco+Esencial',
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

