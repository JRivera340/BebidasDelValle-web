# Auditoría

## Línea base (antes de cambios)

| Métrica | Valor |
|---|---|
| Node / npm | 24.13.0 / 11.6.2 |
| `npm run lint` | Sin errores ni advertencias |
| `npm run build` | Correcto, 46 s |
| Rutas | /, /catalogo, /colecciones, /empresa, 3 de categoría, 7 de producto |
| JS compartido | 87.1 kB |
| First Load JS home | 177 kB (página 30.7 kB) |
| First Load JS catálogo | 148 kB |
| First Load JS colecciones | 149 kB |
| First Load JS empresa | 99.7 kB |
| `npm audit` | 28 vulnerabilidades (2 críticas, 23 altas, 3 moderadas) |

## Hallazgos

### Crítico

| Hallazgo | Ubicación | Corrección |
|---|---|---|
| GA4 con ID fijo `GA_MEASUREMENT_ID`; la variable de entorno no se usa y GA no registra nada | `app/layout.tsx:46,54` vs `lib/analytics.ts:3` | Leer `NEXT_PUBLIC_GA_MEASUREMENT_ID` en el layout |
| `SITE_URL`, sitemap y `metadataBase` apuntan a `example.com`; el sitemap lee `SITE_URL`, el resto `NEXT_PUBLIC_SITE_URL` | `lib/seo.ts:4`, `next-sitemap.config.js:3`, `app/layout.tsx:12` | Unificar en `NEXT_PUBLIC_SITE_URL` |
| Ningún CTA de WhatsApp lleva `ref` de origen: no hay atribución por lead | `lib/whatsapp.ts` | Agregar `ref` a los tres generadores |
| `swiper` con vulnerabilidad crítica (prototype pollution) y 27 más en el árbol | `package.json` | `npm audit fix` y revisar el resto |

### Alto

| Hallazgo | Ubicación | Corrección |
|---|---|---|
| `trackEvent` y los helpers de `lib/analytics.ts` no se llaman desde ningún componente | `lib/analytics.ts` | Llamarlos en CTA, ficha, empresa y colecciones |
| `catalogo` y `empresa` son `'use client'`: sin `metadata` propia (import de `Metadata` sin uso) | `app/catalogo/page.tsx:1,4`, `app/empresa/page.tsx:1,4` | Página de servidor con metadata y componente cliente interno |
| Filtro con botones fijos, falta licores | `components/Filters.tsx:47-70` | Generar desde los datos |
| `<Button asChild disabled>` con `<a>` no bloquea el clic | `components/ProductCard.tsx:92`, `app/producto/[slug]/page.tsx:173` | `aria-disabled` y `pointer-events-none` |
| Showroom: `isMobile` inicia en `false`; en móvil se pinta el acordeón y salta al carrusel | `components/AccordionShowroom.tsx:18-27` | CSS responsive o `matchMedia` inicial |
| `images.remotePatterns` con `hostname: '**'` | `next.config.js:17-20` | Quitar; solo imágenes locales |
| Acordeón de escritorio: `role="button"` que cambia de panel con `onMouseEnter`; sin flechas de teclado | `AccordionShowroom.tsx:160-182` | Revisar patrón ARIA |
| Distribuidores y marcas sin autorización (D5) | `lib/distributors.ts` | Mantener oculto o confirmar |
| Textos comerciales sin confirmar: descuentos 5/10/15/20 %, entrega 24-48 h, "gestor de cuenta", "cotización en 24 horas" | `app/empresa/page.tsx:22-27,67,81`, `app/producto/[slug]/page.tsx:163`, `lib/products.ts:107` | Quitar hasta confirmar (D4) |

### Medio

| Hallazgo | Ubicación | Corrección |
|---|---|---|
| Hex directos en componentes y CSS | `components/LogoCarousel.tsx:13`, `app/globals.css:66-68,95,102` | Tokens |
| `searchProducts` duplica el filtrado del catálogo y no se usa | `lib/products.ts:130`, `app/catalogo/page.tsx:15-39` | Una sola función compartida |
| `zod` instalado y sin uso | `package.json` | Usarlo en el formulario de Empresa |
| `container` de Tailwind con `padding: 2rem` y `px-4` suelto en cada página; gana `px-4`, la config queda inútil | `tailwind.config.ts:14`, todas las páginas | Un solo `Container` |
| Ancho máximo del contenedor 1400 px; la regla pide 1200 px | `tailwind.config.ts:16` | `Container` propio |
| `(window as any).gtag` | `lib/analytics.ts:12-13` | Tipar `window.gtag` |
| Imports sin uso: `Metadata`, `Category` | `app/catalogo/page.tsx:4,8`, `app/empresa/page.tsx:4`, `app/producto/[slug]/page.tsx:12` | Eliminar |
| Teléfono fijo en cuatro lugares | `lib/whatsapp.ts:1`, `components/MobileMenu.tsx:53`, `app/layout.tsx:143`, `lib/seo.ts:49` | `NEXT_PUBLIC_WHATSAPP_NUMBER` en un solo punto |
| Modo oscuro definido en `globals.css` y sin uso | `app/globals.css:34-57` | Reemplazar por el fondo oscuro del rediseño |
| `Header` y `Footer` dentro de `layout.tsx` | `app/layout.tsx:67-153` | Mover a `components/layout/` |
| JSON-LD de `Organization` definido y sin uso; `Product` sin `brand` | `lib/seo.ts:40` | Usarlo en el layout |
| `sitemap` y `robots` ignorados por git, pero la documentación heredada los lista | `.gitignore` | Documentar en `docs/ARQUITECTURA.md` |
| 11 `.md` heredados contradicen el código | raíz | Consolidar en `README.md` |
| Sin `engines` ni redirecciones | `package.json`, `next.config.js` | Fases 4 y 8 |

### Bajo

| Hallazgo | Ubicación | Corrección |
|---|---|---|
| `ProductGallery`: flechas sin `aria-label`; zoom por hover | `components/ProductGallery.tsx:59-74` | Añadir etiquetas |
| Botones del showroom móvil de unos 40 px | `AccordionShowroom.tsx:119-132` | Mínimo 44 px |
| Puntos del carrusel de 8 px como objetivo táctil | `AccordionShowroom.tsx:137-144` | Área de 44 px |
| `style` en línea (valor dinámico) | `components/ProductGallery.tsx:47` | Pasar a variable CSS |
| Contacto del pie solo en texto, sin enlace | `app/layout.tsx:143` | Enlace `wa.me` |
| UTM codificado como un único valor tras `%0A` | `lib/whatsapp.ts` | Revisar y cubrir con prueba |

Sin hallazgo: no hay `console.log`, lenguaje festivo ni restos de "ALMA" en `app/`, `components/` y `lib/`; todos los `<Image>` tienen `alt`; todo `target="_blank"` lleva `rel="noopener noreferrer"`; el único `dangerouslySetInnerHTML` es JSON-LD con datos propios.

### Centrado y layout

| Elemento | Ubicación | Acción |
|---|---|---|
| Hero de home alineado a la izquierda | `app/page.tsx:18` | Centrar |
| Hero de empresa alineado a la izquierda | `app/empresa/page.tsx:34` | Centrar |
| "Productos destacados": título y botón en fila | `app/page.tsx:115-120` | Centrar |
| Título de catálogo a la izquierda | `app/catalogo/page.tsx:43-48` | Centrar |
| Encabezados de categoría y ficha a la izquierda | `app/categoria/[slug]/page.tsx:72-88`, `app/producto/[slug]/page.tsx:81-123` | Centrar |
| Pie de página en 4 columnas con texto a la izquierda | `app/layout.tsx:98-145` | Centrar en móvil |
| Detalle de colecciones con texto a la izquierda | `app/colecciones/page.tsx:55-83` | Centrar |
| Grids de tarjetas sin `place-items-center`; fila incompleta pegada a la izquierda | `app/page.tsx:121`, `app/catalogo/page.tsx:76`, `app/categoria/[slug]/page.tsx:91` | `place-items-center` |
| Imagen de tarjeta con `object-cover` | `components/ProductCard.tsx:34` | `object-contain` |
| Botones del showroom de escritorio a la izquierda | `AccordionShowroom.tsx:268` | Excepción `data-center-exempt` |
| Filtros en barra lateral | `app/catalogo/page.tsx:50-61` | Excepción `data-center-exempt` |

### Accesibilidad

| Hallazgo | Ubicación |
|---|---|
| Sin enlace "saltar al contenido" | `app/layout.tsx` |
| Sin `aria-current` en la navegación | `app/layout.tsx:74-87` |
| Texto blanco sobre `brand-gold` (#C8A349), contraste cercano a 2.4:1 | `app/page.tsx:133`, `components/ui/button.tsx` (variante `gold`) |
| Texto `white/90` sobre el extremo dorado del degradado | `app/page.tsx:16`, `app/empresa/page.tsx:32` |
| Filtros: checkbox nativo y botones de 36 px | `components/Filters.tsx` |
| Animaciones sin `prefers-reduced-motion` | `ProductCard`, `AccordionShowroom`, `ProductGallery`, `LogoCarousel`, `animate-pulse` del botón flotante |
| Menú móvil con Radix Dialog (foco y Escape); verificar en pruebas | `components/MobileMenu.tsx` |

### Rendimiento

| Hallazgo | Ubicación |
|---|---|
| Home con 177 kB de First Load; Swiper y framer-motion en la home | `app/page.tsx` |
| `priority` en cada slide del showroom móvil | `AccordionShowroom.tsx:64` |
| `ProductCard` es `'use client'` solo por una animación de entrada | `components/ProductCard.tsx` |
| Cambio de árbol tras hidratar (CLS) | `AccordionShowroom.tsx` |

## Prioridad de corrección

1. Crítico: GA4, `SITE_URL`, `ref` en WhatsApp, `npm audit`.
2. Alto: metadata, filtros, `disabled`, `isMobile`, `remotePatterns`, textos sin confirmar, eventos GA4.
3. Fase 5: contraste, centrado, tamaños táctiles, `prefers-reduced-motion`.
4. Medio y bajo: durante la reorganización y el catálogo nuevo.
