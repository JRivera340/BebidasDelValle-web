# Backlog

Estado al 15 de octubre de 2026, a partir de la revisión del repo (14 commits entre el 28-oct-2025 y el 1-dic-2025). Prioridad: P0 bloquea publicar, P1 necesario para el rediseño, P2 mejora.

## Decisiones abiertas (requieren respuesta del cliente)

| # | Decisión | Impacto |
|---|---|---|
| D1 | Nombre correcto de la categoría de las bebidas (hoy "vino" en archivos, "bebida sabor ... sin alcohol" en etiquetas) | Textos, SEO, cumplimiento |
| D2 | Buñuelo, Arequipe y Rumberito: ¿siguen en el catálogo? ¿hay fotos? | Catálogo |
| D3 | Teléfono comercial: WhatsApp del código vs. número de la etiqueta | Todos los CTA |
| D4 | Descuentos por volumen, tiempos de entrega y "gestor de cuenta" | Página Empresa |
| D5 | Autorización de uso de marcas y logos de distribuidores | Carrusel de distribuidores |
| D6 | Registro sanitario, razón social, ingredientes por producto | Fichas |
| D7 | Cómo se registra la comisión por lead (código de origen, mensaje, seguimiento) | Modelo de ingresos |
| D8 | Variante Navifiest 320 ml: sabor y si es producto aparte | Catálogo |

## Fase 0: base (P0)

- Migrar a Railway según `DESPLIEGUE-RAILWAY.md`.
- Dominio real en `SITE_URL` y sitemap; `.env.example`.
- Conectar GA4: el layout usa un ID fijo y `analytics.ts` lee la variable; unificar.
- Quitar restos de "ALMA" y consolidar los 11 `.md` de la raíz en `README.md` + `docs/`.
- Cargar catálogo nuevo en `lib/products.ts` con las imágenes del proyecto.

## Fase 1: diseño y movimiento (P1)

- Tokens de color por producto y fondo oscuro cálido.
- Hero con botella y cambio de color por producto.
- Tipografía editorial para titulares.
- Transición de página con elemento compartido.
- Scroll suave y revelados por línea.
- Fichas con sellos de advertencia y CTA con `ref` de origen.

## Fase 2: producto y contenido (P1)

- Colecciones nuevas (ver `PRODUCTOS.md`).
- Página Empresa con composición de caja por cantidad.
- Metadata propia en `catalogo` y `empresa`.
- Filtro de categorías generado desde los datos, no botones fijos.
- Corregir el salto de `isMobile` en el showroom (CSS responsive o `matchMedia` con valor inicial).

## Fase 3: calidad (P2)

- `Button asChild disabled` con `<a>` no bloquea el clic: manejar con `aria-disabled` y `pointer-events`.
- `searchProducts` duplica la lógica de filtrado del catálogo: unificar.
- Padding del contenedor de Tailwind (2 rem) más `px-4` en páginas: elegir uno.
- `.gitignore` ignora robots y sitemap, que se generan en build: dejar documentado.
- `zod`: usar o eliminar.
- Lighthouse móvil real, línea base y presupuesto.
- Pruebas de humo (Playwright) sobre la ruta de conversión.

## Fase 4: escala (P2)

- Partículas y showroom con profundidad.
- Botella 3D bajo demanda en escritorio.
- Evaluar CMS (Sanity, Payload u otro) si el catálogo crece o el cliente quiere editar sin el repo.
- Panel simple de leads por origen para sustentar la comisión.

## Documentación heredada a eliminar

`PROJECT_SUMMARY`, `FEATURES`, `ROUTES`, `DEPLOY_*`, `INSTRUCCIONES_DEPLOY_SIMPLE`, `DIAGNOSTICO_RAPIDO`, `fix-loading`, `CAMBIAR_IMAGENES`, `CAMBIOS_REALIZADOS`. Contradicen el código (6 productos y 15 páginas vs. 7 productos, Unsplash vs. SVG locales, pnpm vs. npm). Su contenido útil ya está en `docs/`.
