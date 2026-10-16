# Catálogo de productos

Fuente de verdad en código: `lib/data/products.ts`. Este documento explica qué hay, qué imagen corresponde a cada producto y qué datos están confirmados. Decisión del propietario: **las cuatro líneas de abajo reemplazan el catálogo anterior** (Cereza, Manzana, Moscatel, Natilla, Buñuelo, Arequipe, Rumberito).

## Líneas y productos

| Línea | Producto | Formato visto en empaque | Sellos visibles | Archivo de imagen |
|---|---|---|---|---|
| Vinifrut | Uva | Botella 750 ml, "Bebida sabor uva, sin alcohol" | Contiene edulcorantes | `Moscatel.jpeg` |
| Vinifrut | Cereza | Botella 750 ml, "Bebida sabor cereza, sin alcohol" | Contiene edulcorantes | `Vino Cereza.jpeg` |
| Navifiest | Manzana | Botella 750 ml, cuello con papel dorado | Contiene edulcorantes (a verificar) | `Vino Manzana.jpeg`, `Vino Manzana Fondo Navideño.jpeg`, `Vino Manzana fondo rosa.jpeg` |
| Navifiest | Variante 320 ml (fondo melocotón) | Botella 320 ml | Contiene edulcorantes (a verificar) | `Vino Manza fondo melocoton.jpeg` |
| La Molienda | Natilla Tradicional | Caja de mezcla en polvo para preparar | Exceso en azúcares, exceso en sodio | `Natilla.jpeg` |
| Torti Valle | Torta de temporada | Caja con ventana, torta | Exceso en azúcares, exceso en grasas saturadas | `Pastel Navideño.jpeg` |

Las 8 imágenes son 5 productos distintos más variaciones de fondo de la misma botella Navifiest. Las variaciones sirven para rotar heros y fondos de sección, no como productos separados.

## Reglas de nombre

- Los archivos y nombres internos dicen "Vino", pero las etiquetas dicen "Bebida sabor ... sin alcohol". En el sitio se usa "bebida sabor a ..." hasta que el cliente indique el término correcto.
- La caja de Torti Valle dice "Torta Navideña" en el empaque. En el texto del sitio se escribe "Torta de temporada". El empaque no se retoca.
- El archivo `Moscatel.jpeg` muestra la bebida de uva. Se renombra a `vinifrut-uva.jpg` al entrar al repo (ver convención).

## Convención de archivos de imagen

`public/img/productos/<linea>-<producto>[-<variante>].<ext>` en minúsculas y sin tildes. Ejemplos: `vinifrut-uva.jpg`, `navifiest-manzana-rojo.jpg`, `navifiest-manzana-verde.jpg`, `navifiest-manzana-rosa.jpg`, `navifiest-320-melocoton.jpg`, `la-molienda-natilla.jpg`, `torti-valle-torta.jpg`. Formato final: AVIF/WebP generados por `next/image`; originales en JPG de alta calidad.

## Modelo de datos (`lib/types.ts`)

El catálogo está en `lib/data/products.ts` y las colecciones en `lib/data/collections.ts`.

```ts
interface Producto {
  slug: string              // 'vinifrut-uva'
  linea: 'vinifrut' | 'navifiest' | 'la-molienda' | 'torti-valle'
  nombre: string            // 'Uva'
  categoria: 'bebidas' | 'harinas' | 'panaderia'
  presentaciones: { tamano: string; sku?: string }[]
  sellos: ('azucares' | 'sodio' | 'grasas-saturadas' | 'edulcorantes')[]
  imagenes: { src: string; alt: string; acento?: Acento }[]
  acento: Acento            // token de color, ver MARCA-Y-DISENO.md
  descripcion: string
  disponible: boolean
  precio?: number
  datosConfirmados: { precio: boolean; ingredientes: boolean; registroSanitario: boolean }
}
```

`datosConfirmados` impide que la interfaz muestre un dato sin respaldo del cliente. Los SKU se omiten hasta que el cliente los entregue. El formato de 320 ml de Navifiest se modela como presentación del producto Manzana (decisión D8 pendiente).

## Estado de datos

| Dato | Estado |
|---|---|
| Nombres de línea y producto | Tomados de las imágenes, falta confirmación del cliente |
| Precios | No existen. No se publican. |
| Ingredientes y tabla nutricional | No legibles en las imágenes. Pendiente del cliente |
| Registro sanitario INVIMA y razón social | Texto ilegible en la imagen. Pendiente del cliente |
| Teléfono de contacto | La etiqueta muestra un número distinto al de WhatsApp del código. Confirmar cuál es el canal comercial |
| Distribuidores autorizados | Lista de 8 en `lib/distributors.ts`. Falta autorización de uso de marcas y logos |
| Descuentos por volumen (5, 10, 15, 20%+) y entrega 24-48 h | Texto fijo en la página Empresa. Falta confirmar |

## Productos del catálogo anterior sin imagen nueva

Buñuelo, sabor Arequipe y Aperitivo Rumberito no tienen imagen en el material actual. Quedan **fuera del catálogo publicado** hasta que el cliente confirme si siguen y entregue fotos. Está registrado como decisión abierta en `BACKLOG.md`.

## Colecciones

Las colecciones anteriores (Rojo Clásico, Dorado Premium, Blanco Esencial) se reorganizan con el catálogo nuevo. Propuesta a validar:

- **Cestas de bebidas:** Vinifrut Uva, Vinifrut Cereza, Navifiest Manzana.
- **Mesa de temporada:** La Molienda Natilla, Torti Valle Torta, una bebida a elección.
- **Regalo corporativo:** combinación configurable por cantidad (conecta con la página Empresa).
