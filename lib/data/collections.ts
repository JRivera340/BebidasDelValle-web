import type { Coleccion } from '../types'

export const COLECCIONES: Coleccion[] = [
  {
    id: 'cestas-de-bebidas',
    nombre: 'Cestas de bebidas',
    descripcion: 'Uva, cereza y manzana para armar una cesta equilibrada.',
    acento: 'cereza',
    imagen: {
      src: '/img/productos/vinifrut-cereza.jpg',
      alt: 'Botella de Vinifrut sabor cereza sobre fondo rojo',
      acento: 'cereza',
    },
    productos: ['vinifrut-uva', 'vinifrut-cereza', 'navifiest-manzana'],
  },
  {
    id: 'mesa-de-temporada',
    nombre: 'Mesa de temporada',
    descripcion: 'Natilla, torta y una bebida para compartir en la mesa.',
    acento: 'mantel',
    imagen: {
      src: '/img/productos/torti-valle-torta.jpg',
      alt: 'Caja de torta Torti Valle sobre una superficie nevada',
      acento: 'mantel',
    },
    productos: ['la-molienda-natilla', 'torti-valle-torta', 'navifiest-manzana'],
  },
  {
    id: 'regalo-corporativo',
    nombre: 'Regalo corporativo',
    descripcion: 'Combinación a la medida según la cantidad y el destinatario.',
    acento: 'manzana',
    imagen: {
      src: '/img/productos/navifiest-manzana-rojo.jpg',
      alt: 'Botella de Navifiest sabor manzana con cuello dorado',
      acento: 'manzana',
    },
    productos: ['vinifrut-uva', 'navifiest-manzana', 'torti-valle-torta'],
  },
]
