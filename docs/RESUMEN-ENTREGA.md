# Resumen de entrega

Rama de trabajo: `feat/rediseno-base`. Fecha: 16 de octubre de 2026.

## Qué cambió

- **Estructura:** `components/{ui,layout,sections,product,motion}`, `lib/data/`, `tests/{unit,e2e}`, `docs/`. README propio y eliminación de los 11 `.md` heredados.
- **Catálogo:** Vinifrut (Uva, Cereza), Navifiest (Manzana, 750 y 320 ml), La Molienda (Natilla Tradicional) y Torti Valle (Torta de temporada). Categorías `bebidas`, `harinas`, `panaderia`; tres colecciones. Sellos por producto y `datosConfirmados` en falso. Redirecciones permanentes de las rutas anteriores.
- **Diseño:** fondo oscuro cálido, tokens por producto, Fraunces e Inter, `Container` y `Section` (todo centrado, con `data-center-exempt` en el acordeón), sellos octogonales, botón flotante de WhatsApp en móvil, enlace para saltar al contenido.
- **Movimiento:** hero que rota entre productos con cambio de halo, titular revelado por líneas, scroll suave y transición de página con elemento compartido (View Transitions). Todo respeta `prefers-reduced-motion`.
- **Conversión y SEO:** GA4 por variable de entorno, `ref` de origen en cada mensaje de WhatsApp, evento `generate_lead` en cada clic, `view_item` en fichas, metadata y canonical por ruta, JSON-LD de `Organization`, `Product` y `BreadcrumbList` (sin `Offer` sin precio confirmado).
- **Calidad:** formulario de Empresa validado con zod, `remotePatterns` eliminado, sección de distribuidores y `swiper` retirados (D5), `next` 14.2.35, `sharp`, `engines` de Node 20.

## Decisiones con valor por defecto (`TODO(D#)`)

D1 (nombre de la categoría), D2 (productos sin foto), D4 (descuentos y entregas retirados), D5 (distribuidores), D6 (datos de etiqueta), D8 (variante de 320 ml). Detalle en `docs/BACKLOG.md`.

## Resultados

| Verificación | Resultado |
|---|---|
| `npm run lint` y `npm run typecheck` | Sin errores |
| Pruebas unitarias | 34 pasan |
| Pruebas e2e (móvil y escritorio) | 122 pasan, 4 omitidas (capturas visuales y pruebas de un solo dispositivo) |
| axe (WCAG 2.1 A y AA) en 6 rutas | Sin violaciones críticas ni serias |
| Lighthouse móvil, home | Rendimiento 88, accesibilidad 98, buenas prácticas 96, SEO 100; LCP 3.7 s, CLS 0 |
| Lighthouse móvil, ficha | Rendimiento 87, accesibilidad 100, buenas prácticas 96, SEO 100; LCP 3.8 s, CLS 0 |
| `npm audit --omit=dev` | 10 advisories (1 crítica) en `next@14`; se resuelven al migrar a Next 15 o superior |

El LCP y el rendimiento quedaron por debajo del objetivo (2.5 s y 90) en la simulación de 4G lenta de Lighthouse; está en el backlog.

## Bundle frente a la línea base

| Ruta | Antes | Ahora |
|---|---|---|
| `/` | 177 kB | 152 kB |
| `/catalogo` | 148 kB | 116 kB |
| `/colecciones` | 149 kB | 151 kB |
| `/empresa` | 99.7 kB | 112 kB |
| Compartido | 87.1 kB | 87.3 kB |

Primera carga de JS reportada por `next build`. La home queda por debajo del presupuesto de 200 kB.

## Ver el sitio en local

```bash
npm ci
cp .env.example .env.local
npm run dev        # http://localhost:3000
# o la versión de producción
npm run build && npm run start
```

Pruebas: `npm test` y `npm run test:e2e`.
