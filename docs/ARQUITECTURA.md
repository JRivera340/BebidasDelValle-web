# Arquitectura

Sitio estático en Next.js 14 (App Router). Sin base de datos ni autenticación: los datos viven en `lib/data/` y las conversiones salen por WhatsApp.

## Estructura

```
app/                         rutas y layout raíz, sin lógica de negocio
  page.tsx                   Home
  catalogo/                  Catálogo (página de servidor + componente cliente de filtros)
  categoria/[slug]/          SSG por categoría
  producto/[slug]/           SSG por producto + JSON-LD
  colecciones/               Showroom y detalle por colección
  empresa/                   Pedidos corporativos (formulario validado con zod)
  not-found.tsx, globals.css
components/
  ui/                        Primitivos: button, badge, card, input, label, sheet
  layout/                    Header, Footer, MobileMenu, Container, Section,
                             EncabezadoPagina, WhatsAppFloat, WhatsAppTracker
  sections/                  Hero, AccordionShowroom, CotizacionForm
  product/                   ProductCard, ProductGrid, ProductGallery, SellosAdvertencia,
                             Filters, CatalogoInteractivo, Breadcrumb, VistaProducto
  motion/                    TransicionPagina (View Transitions)
lib/
  data/                      products.ts, collections.ts
  types.ts  whatsapp.ts  seo.ts  analytics.ts  validacion.ts  utils.ts
public/img/productos/        Imágenes de producto (convención en PRODUCTOS.md)
tests/
  unit/                      Vitest + Testing Library
  e2e/                       Playwright (conversión, layout, accesibilidad)
docs/
```

`sitemap.xml` y `robots.txt` los genera `next-sitemap` en el `postbuild` y están en `.gitignore`.

## Rutas

| Ruta | Render | Contenido |
|---|---|---|
| `/` | Estático | Hero con rotación de producto, beneficios, showroom, destacados, CTA |
| `/catalogo` | Estático + cliente | Búsqueda, categorías generadas desde los datos, solo disponibles |
| `/categoria/[slug]` | SSG | `bebidas`, `harinas`, `panaderia` |
| `/producto/[slug]` | SSG | Galería, presentaciones, sellos, otros productos, JSON-LD |
| `/colecciones` | Estático | Showroom y una sección por colección |
| `/empresa` | Estático + cliente | Proceso, formulario de cotización, preguntas frecuentes |

Redirecciones permanentes de las rutas anteriores (`/producto/vino-*`, `/producto/harina-natilla`, `/categoria/vinos`, `/categoria/licores`) en `next.config.js`. Next responde 308, equivalente a 301 para buscadores.

## Flujo de conversión

1. El usuario ve producto, colección o la página Empresa.
2. El CTA es un enlace `wa.me` creado por `lib/whatsapp.ts` (producto, cesta, volumen o contacto general).
3. Cada mensaje lleva `utm_source=web&utm_medium=cta&utm_campaign=<contexto>&ref=<origen>` dentro del texto, codificado con `encodeURIComponent`. Ejemplos de `ref`: `hero`, `ficha-vinifrut-uva`, `tarjeta-la-molienda-natilla`, `showroom`, `empresa-formulario`.
4. `WhatsAppTracker` escucha los clics a `wa.me` y envía `generate_lead` a GA4 con campaña y origen. `VistaProducto` envía `view_item`, el showroom `select_content` y el formulario `generate_lead` de cotización.

## SEO

- `generateMetadata` por ruta con canonical; JSON-LD `Organization` en el layout y `Product` más `BreadcrumbList` en la ficha.
- `Offer` solo si `datosConfirmados.precio` es verdadero y existe `precio`.
- Locale `es_CO`.

## Variables de entorno

| Variable | Uso | Cuándo se lee |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, Open Graph, JSON-LD | Build |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 (si falta, no se cargan los scripts) | Build |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de destino de los CTA | Build |

Las `NEXT_PUBLIC_*` se incrustan al compilar: cambiar una exige un nuevo build. Plantilla en `.env.example`.

## Decisiones técnicas

- Datos en código hasta que el catálogo supere unas 30 referencias o el cliente quiera editarlo sin tocar el repo; entonces se evalúa un CMS.
- Estilos con tokens CSS (canales RGB en `globals.css`) expuestos en `tailwind.config.ts`; sin hex en componentes.
- Centrado por defecto con `Container` (1200 px, padding `px-4 sm:px-6 lg:px-8`) y `Section`. Excepciones declaradas con `data-center-exempt` (acordeón de escritorio).
- Movimiento sin GSAP ni Lenis: framer-motion solo en el showroom, CSS para el hero y View Transitions para la navegación. Mantiene el JS inicial de la home en 152 kB.
- La transición con elemento compartido usa `document.startViewTransition`; sin soporte del navegador o con `prefers-reduced-motion` la navegación es la normal.
- Imágenes con `next/image` y `sharp`; solo se sirven imágenes locales (sin `remotePatterns`).
- `zod` valida el formulario de Empresa (`lib/validacion.ts`).
- Advisories pendientes de `npm audit` en `next@14`: se resuelven al migrar a Next 15 o superior (ver `BACKLOG.md`).
