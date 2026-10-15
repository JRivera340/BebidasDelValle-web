# Arquitectura

Sitio estático-dinámico en Next.js 14 (App Router). Sin base de datos ni autenticación: los datos viven en `lib/` y las conversiones salen por WhatsApp.

## Estructura

```
app/
  layout.tsx            Header, Footer, GA, metadata global
  page.tsx              Home
  catalogo/page.tsx     Catálogo con filtros (cliente)
  categoria/[slug]/     SSG por categoría
  producto/[slug]/      SSG por producto + JSON-LD
  colecciones/page.tsx  Showroom y detalle por colección
  empresa/page.tsx      Pedidos corporativos (cliente)
  not-found.tsx, globals.css
components/
  AccordionShowroom, ProductCard, ProductGallery, Filters,
  CollectionBadge, LogoCarousel, MobileMenu, ui/{badge,button,card,input,label,sheet}
lib/
  products.ts, types.ts, whatsapp.ts, seo.ts, analytics.ts, distributors.ts, utils.ts
public/img/{productos,colecciones,distribuidores}/
```

Nota de migración: las carpetas `vinos/`, `harinas/` y `licores/` de `public/img/` se reemplazan por `productos/` según `docs/PRODUCTOS.md`.

## Rutas

| Ruta | Render | Contenido |
|---|---|---|
| `/` | Estático | Hero, beneficios, showroom, destacados, distribuidores, CTA |
| `/catalogo` | Cliente | Búsqueda, filtro por categoría, solo disponibles |
| `/categoria/[slug]` | SSG | Listado y breadcrumb JSON-LD |
| `/producto/[slug]` | SSG | Galería, presentaciones, sellos, relacionados, JSON-LD |
| `/colecciones` | Estático | Colecciones y CTA por colección |
| `/empresa` | Cliente | Tabla de descuentos por volumen (sin confirmar), formulario a WhatsApp, FAQ |

Las slugs de categoría pasan de `vinos | licores | harinas` a `bebidas | harinas | panaderia`. Redirecciones 301 de las slugs viejas en `next.config.js` si el sitio ya estuvo indexado.

## Flujo de conversión

1. Usuario ve producto, colección o página Empresa.
2. CTA llama a un helper de `lib/whatsapp.ts` (producto, cesta o volumen) y abre `wa.me` con mensaje prellenado.
3. Cada mensaje lleva `utm_source=web&utm_medium=cta&utm_campaign=<contexto>`.
4. `lib/analytics.ts` dispara el evento GA4 correspondiente antes de abrir WhatsApp.

Por el modelo de comisión, el mensaje incluye además el producto y un identificador corto de origen (por ejemplo `ref=hero`, `ref=ficha-uva`) para reconstruir de dónde vino cada venta.

## SEO

- `next-sitemap` en `postbuild` genera `sitemap.xml` y `robots.txt` leyendo `NEXT_PUBLIC_SITE_URL`.
- JSON-LD: `Product` y `BreadcrumbList` en ficha; `Offer` solo cuando exista precio confirmado.
- `generateMetadata` por ruta. Las páginas `catalogo` y `empresa` son de cliente, así que la metadata se define en un `layout.tsx` de su carpeta o separando la parte interactiva en un componente cliente.
- Locale `es_CO`.

## Variables de entorno

| Variable | Uso | Cuándo se lee |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, Open Graph | Build |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 | Build |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de destino de los CTA | Build |

Las variables `NEXT_PUBLIC_*` se incrustan al compilar: cambiar una exige un nuevo build. Plantilla en `.env.example`, nunca `.env` en el repo.

## Decisiones técnicas

- Datos en código hasta que el catálogo supere unas 30 referencias o el cliente quiera editarlo sin tocar el repo; entonces se evalúa un CMS (ver `BACKLOG.md`).
- Estilos con tokens CSS y Tailwind; componentes de `ui/` al estilo shadcn.
- Animación: framer-motion se mantiene para componentes; GSAP y Lenis se incorporan para scroll y secuencias (ver `MARCA-Y-DISENO.md`). Se evita mezclar dos librerías en el mismo elemento.
- Imágenes con `next/image` y lista cerrada de hosts en `next.config.js` (hoy permite cualquier host y debe restringirse).
- `zod` instalado y sin uso: se usa para validar el formulario de Empresa o se elimina.
