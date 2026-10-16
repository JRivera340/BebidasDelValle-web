export type Categoria = 'bebidas' | 'harinas' | 'panaderia'

export type Linea = 'vinifrut' | 'navifiest' | 'la-molienda' | 'torti-valle'

export type Sello = 'azucares' | 'sodio' | 'grasas-saturadas' | 'edulcorantes'

export type Acento =
  | 'uva'
  | 'cereza'
  | 'manzana'
  | 'bosque'
  | 'melocoton'
  | 'rosa'
  | 'brasa'
  | 'mantel'

export interface Presentacion {
  tamano: string
  sku?: string
}

export interface ImagenProducto {
  src: string
  alt: string
  acento?: Acento
}

export interface DatosConfirmados {
  precio: boolean
  ingredientes: boolean
  registroSanitario: boolean
}

export interface Producto {
  slug: string
  linea: Linea
  nombre: string
  categoria: Categoria
  presentaciones: Presentacion[]
  sellos: Sello[]
  imagenes: ImagenProducto[]
  acento: Acento
  descripcion: string
  disponible: boolean
  precio?: number
  datosConfirmados: DatosConfirmados
}

export interface Coleccion {
  id: string
  nombre: string
  descripcion: string
  acento: Acento
  imagen: ImagenProducto
  productos: string[]
}
