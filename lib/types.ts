export type Category = 'vinos' | 'harinas'

export interface Variant {
  name: string
  sku: string
  price?: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  variants?: Variant[]
  description: string
  tags: string[]
  images: string[]
  available: boolean
  badges?: string[]
}

export interface Collection {
  id: string
  name: string
  color: 'red' | 'gold' | 'white'
  description: string
  features: string[]
  image: string
  products: string[]
}

