# Reglas del proyecto

Reglas permanentes de Bebidas del Valle. Si algo del código las contradice, se corrige el código o se registra la excepción en `docs/BACKLOG.md`.

## Qué es el sitio

- Catálogo y generación de leads. No es e-commerce: sin carrito, pagos, login ni base de datos.
- Todo CTA termina en WhatsApp con mensaje prellenado, UTM y `ref` de origen.
- Ingreso: comisión sobre las ventas que cierra la empresa con clientes que llegan por la web. La atribución del lead es parte del producto.
- Público: cestas personalizadas, regalos corporativos y pedidos por volumen. Mercado: Colombia (es-CO, COP).

## Contenido

1. Los textos visibles no usan lenguaje festivo explícito (navidad, aguinaldo, novena). Se dice "selección de temporada", "regalos corporativos", "cestas personalizadas". La ambientación visual de temporada es válida si es sutil.
2. No se usa la palabra "vino" en textos de producto mientras la decisión D1 siga abierta. Se dice "bebida sabor a ...".
3. Toda ficha muestra los sellos de advertencia del empaque (azúcares, sodio, grasas saturadas, edulcorantes), completos y legibles.
4. No se publican precios, descuentos, registro sanitario, ingredientes, tiempos de entrega ni distribuidores sin confirmación del cliente. Lo pendiente se marca en `datosConfirmados`.
5. Las imágenes actuales son arte de campaña con texto de etiqueta ilegible; no son fuente de datos legales.

## Código

1. Tokens de diseño en CSS y Tailwind. Sin hex directos en componentes.
2. Toda animación respeta `prefers-reduced-motion`.
3. Todo es centrado por defecto con `Container` y `Section`; la asimetría se declara con `data-center-exempt`.
4. Componentes de servidor por defecto; `'use client'` solo con estado, efectos o eventos.
5. Datos en `lib/data`, sin lógica de negocio en componentes de presentación.
6. Enlaces externos con `rel="noopener noreferrer"`; URLs de WhatsApp con `encodeURIComponent`.
7. Sin `console.log`, código comentado ni `TODO` sin referencia a una decisión (`TODO(D#)`).

## Rendimiento y accesibilidad

- LCP < 2.5 s en móvil, CLS < 0.1, JS inicial de la home < 200 kB gzip.
- Contraste AA, foco visible, objetivos táctiles de 44 px.

## Flujo

- Rama corta desde `main`, sin commits directos a `main`.
- Commits de una línea, Conventional Commits en español.
- `npm run check` en verde antes de cerrar un cambio.
- Docs actualizados según el contrato de `docs/WORKFLOW.md`.
