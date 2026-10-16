# Backlog

Estado al 16 de octubre de 2026. Prioridad: P0 bloquea publicar, P1 necesario para el rediseño, P2 mejora.

## Decisiones abiertas (requieren respuesta del cliente)

Se aplicó la opción por defecto y quedó marcada con `TODO(D#)` en el código.

| # | Decisión | Opción aplicada | Dónde |
|---|---|---|---|
| D1 | Nombre correcto de la categoría de las bebidas | Se dice "bebida sabor a ..."; no se usa "vino" | `lib/data/products.ts`, prueba en `tests/unit/products.test.ts` |
| D2 | Buñuelo, Arequipe y Rumberito | Fuera del catálogo publicado, con redirección a `/catalogo` | `lib/data/products.ts`, `next.config.js` |
| D3 | Teléfono comercial | `573113440504` en `NEXT_PUBLIC_WHATSAPP_NUMBER` | `.env.example`, `lib/whatsapp.ts` |
| D4 | Descuentos por volumen, tiempos de entrega, gestor de cuenta | Retirados del sitio; pedido mínimo de 10 unidades | `app/empresa/page.tsx`, `lib/validacion.ts` |
| D5 | Autorización de marcas y logos de distribuidores | Sección y dependencia `swiper` eliminadas | `docs/AUDITORIA.md` |
| D6 | Registro sanitario, razón social, ingredientes | No se publican; `datosConfirmados` en falso | `lib/data/products.ts` |
| D7 | Registro de la comisión por lead | `ref` de origen en cada mensaje y evento `generate_lead` en GA4 | `lib/whatsapp.ts`, `components/layout/WhatsAppTracker.tsx` |
| D8 | Variante Navifiest 320 ml | Presentación del producto Manzana, con su imagen en la galería | `lib/data/products.ts` |

## Resuelto

- Reorganización de carpetas, README propio y eliminación de los 11 `.md` heredados.
- GA4 por variable de entorno y eventos conectados; `SITE_URL` unificada.
- Catálogo nuevo (5 productos, 3 categorías, 3 colecciones) con sellos y `datosConfirmados`.
- Metadata y canonical por ruta; JSON-LD sin `Offer` sin precio confirmado.
- Filtro de categorías generado desde los datos y una sola función de búsqueda.
- Botón deshabilitado con `aria-disabled`; salto de `isMobile` eliminado con CSS responsive.
- Sistema de diseño oscuro, `Container` y `Section`, tipografía editorial, botón flotante de WhatsApp.
- Hero con rotación de producto, titular por líneas, transición con elemento compartido.
- Pruebas unitarias, e2e, de layout y de accesibilidad; CI en GitHub Actions.
- `remotePatterns` eliminado, `zod` en uso, `engines` de Node, `sharp` para imágenes.

## Abierto

| Prioridad | Pendiente |
|---|---|
| P0 | Fotografía real del producto y datos de etiqueta (D6): las imágenes actuales son arte de campaña |
| P0 | Definir dominio final y cargar variables en el entorno de despliegue |
| P1 | Rendimiento móvil: Lighthouse 87-88 y LCP 3.7 s en simulación 4G lenta (objetivo 90 y 2.5 s). Probar menos ancho de imagen, calidad 60-65 y recorte del JS compartido |
| P1 | Migrar a Next 15 o superior: las advisories restantes de `npm audit` están en `next@14` |
| P1 | Migrar a Railway según `DESPLIEGUE-RAILWAY.md` |
| P2 | Cursor con halo del color del producto (solo puntero fino) |
| P2 | Showroom horizontal con parallax de profundidad y partículas de luz |
| P2 | Botella 3D bajo demanda en escritorio |
| P2 | Capturas de referencia visuales (`VISUAL=1 npm run test:e2e`) generadas en CI para evitar diferencias de sistema operativo |
| P2 | WebKit móvil en las pruebas e2e |
| P2 | Evaluar CMS si el catálogo crece o el cliente quiere editar sin el repo |
| P2 | Panel simple de leads por origen para sustentar la comisión |
