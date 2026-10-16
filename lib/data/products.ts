import type { Categoria, Linea, Producto } from '../types'

export const LINEAS: Record<Linea, string> = {
  vinifrut: 'Vinifrut',
  navifiest: 'Navifiest',
  'la-molienda': 'La Molienda',
  'torti-valle': 'Torti Valle',
}

export const CATEGORIAS: Record<Categoria, { nombre: string; descripcion: string }> = {
  bebidas: {
    nombre: 'Bebidas',
    // TODO(D1): confirmar con el cliente el término correcto de la categoría
    descripcion:
      'Bebidas sabor a uva, cereza y manzana, sin alcohol, en botella. Ideales para cestas personalizadas y regalos corporativos.',
  },
  harinas: {
    nombre: 'Harinas',
    descripcion: 'Mezclas en polvo para preparar postres tradicionales en casa.',
  },
  panaderia: {
    nombre: 'Panadería',
    descripcion: 'Tortas de temporada en caja, para acompañar la mesa o sumar a una cesta.',
  },
}

const SIN_CONFIRMAR = { precio: false, ingredientes: false, registroSanitario: false }

export const PRODUCTOS: Producto[] = [
  {
    slug: 'vinifrut-uva',
    linea: 'vinifrut',
    nombre: 'Uva',
    categoria: 'bebidas',
    presentaciones: [{ tamano: '750 ml' }],
    sellos: ['edulcorantes'],
    imagenes: [
      {
        src: '/img/productos/vinifrut-uva.jpg',
        alt: 'Botella de Vinifrut sabor uva entre racimos y salpicaduras sobre fondo morado',
        acento: 'uva',
      },
    ],
    acento: 'uva',
    descripcion:
      'Bebida sabor a uva, sin alcohol, en botella de 750 ml. Una opción para sumar a cestas personalizadas y regalos corporativos.',
    disponible: true,
    datosConfirmados: SIN_CONFIRMAR,
  },
  {
    slug: 'vinifrut-cereza',
    linea: 'vinifrut',
    nombre: 'Cereza',
    categoria: 'bebidas',
    presentaciones: [{ tamano: '750 ml' }],
    sellos: ['edulcorantes'],
    imagenes: [
      {
        src: '/img/productos/vinifrut-cereza.jpg',
        alt: 'Botella de Vinifrut sabor cereza rodeada de cerezas y salpicaduras sobre fondo rojo',
        acento: 'cereza',
      },
    ],
    acento: 'cereza',
    descripcion:
      'Bebida sabor a cereza, sin alcohol, en botella de 750 ml. Aroma frutal para cestas personalizadas y regalos corporativos.',
    disponible: true,
    datosConfirmados: SIN_CONFIRMAR,
  },
  {
    slug: 'navifiest-manzana',
    linea: 'navifiest',
    nombre: 'Manzana',
    categoria: 'bebidas',
    // TODO(D8): confirmar sabor y si la presentación de 320 ml es un producto aparte
    presentaciones: [{ tamano: '750 ml' }, { tamano: '320 ml' }],
    // TODO(D6): verificar los sellos en la etiqueta real
    sellos: ['edulcorantes'],
    imagenes: [
      {
        src: '/img/productos/navifiest-manzana-rojo.jpg',
        alt: 'Botella de Navifiest sabor manzana con cuello dorado sobre fondo rojo',
        acento: 'manzana',
      },
      {
        src: '/img/productos/navifiest-manzana-verde.jpg',
        alt: 'Botella de Navifiest sabor manzana sobre fondo verde oscuro',
        acento: 'bosque',
      },
      {
        src: '/img/productos/navifiest-manzana-rosa.jpg',
        alt: 'Botella de Navifiest sabor manzana sobre fondo rosa',
        acento: 'rosa',
      },
      {
        src: '/img/productos/navifiest-320-melocoton.jpg',
        alt: 'Botella de Navifiest de 320 ml sobre fondo color melocotón',
        acento: 'melocoton',
      },
    ],
    acento: 'manzana',
    descripcion:
      'Bebida sabor a manzana, sin alcohol, en botella de 750 ml y en formato de 320 ml. Con cuello dorado, lista para acompañar una cesta.',
    disponible: true,
    datosConfirmados: SIN_CONFIRMAR,
  },
  {
    slug: 'la-molienda-natilla',
    linea: 'la-molienda',
    nombre: 'Natilla Tradicional',
    categoria: 'harinas',
    presentaciones: [],
    sellos: ['azucares', 'sodio'],
    imagenes: [
      {
        src: '/img/productos/la-molienda-natilla.jpg',
        alt: 'Caja de mezcla en polvo La Molienda para preparar natilla tradicional',
        acento: 'brasa',
      },
    ],
    acento: 'brasa',
    descripcion:
      'Mezcla en polvo para preparar natilla tradicional. Complementa una cesta o la mesa de temporada.',
    disponible: true,
    datosConfirmados: SIN_CONFIRMAR,
  },
  {
    slug: 'torti-valle-torta',
    linea: 'torti-valle',
    nombre: 'Torta de temporada',
    categoria: 'panaderia',
    presentaciones: [],
    sellos: ['azucares', 'grasas-saturadas'],
    imagenes: [
      {
        src: '/img/productos/torti-valle-torta.jpg',
        alt: 'Caja de torta Torti Valle con ventana, sobre una superficie nevada con casitas de jengibre',
        acento: 'mantel',
      },
    ],
    acento: 'mantel',
    descripcion: 'Torta de temporada en caja con ventana. Para acompañar la mesa o sumar a una cesta.',
    disponible: true,
    datosConfirmados: SIN_CONFIRMAR,
  },
]

// TODO(D2): Buñuelo, Arequipe y Rumberito quedan fuera hasta tener confirmación y fotos

export function getProductoPorSlug(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug)
}

export function getProductosPorCategoria(categoria: Categoria): Producto[] {
  return PRODUCTOS.filter((p) => p.categoria === categoria)
}

export function esCategoria(valor: string): valor is Categoria {
  return valor in CATEGORIAS
}

export interface FiltroProductos {
  texto?: string
  categoria?: Categoria | 'todas'
  soloDisponibles?: boolean
}

export function filtrarProductos(
  { texto = '', categoria = 'todas', soloDisponibles = false }: FiltroProductos,
  lista: Producto[] = PRODUCTOS
): Producto[] {
  const q = texto.trim().toLowerCase()
  return lista.filter((p) => {
    if (categoria !== 'todas' && p.categoria !== categoria) return false
    if (soloDisponibles && !p.disponible) return false
    if (!q) return true
    return (
      p.nombre.toLowerCase().includes(q) ||
      LINEAS[p.linea].toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q)
    )
  })
}

export function nombreCompleto(p: Pick<Producto, 'linea' | 'nombre'>): string {
  return `${LINEAS[p.linea]} ${p.nombre}`
}
