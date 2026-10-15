# Marca y diseño

Objetivo: que el sitio se vea como trabajo de diseño de medios interactivos, no como plantilla. Neutro con toque de temporada: la ambientación navideña existe en la luz, el color y el movimiento, no en palabras ni en clichés (sin renos, gorros ni copos genéricos).

## Paleta

Base de marca existente: rojo `#B11E2F`, dorado `#C8A349`, blanco.

Colores de producto, muestreados de las imágenes (fondo = color de las esquinas; dominante = color más frecuente):

| Token | Producto | Fondo | Dominante |
|---|---|---|---|
| `--uva` | Vinifrut Uva | `#25013E` | `#51017A` |
| `--cereza` | Vinifrut Cereza | `#680114` | `#AD042B` |
| `--manzana` | Navifiest Manzana (rojo) | `#6B0103` | `#A0020D` |
| `--bosque` | Navifiest fondo verde | `#02170B` | `#2D4126` |
| `--melocoton` | Navifiest 320 ml | `#CA4601` | `#E96C1B` |
| `--rosa` | Navifiest fondo rosa | `#BE8282` | `#48161B` |
| `--brasa` | La Molienda Natilla | `#1B150C` | `#803B1C` |
| `--mantel` | Torti Valle Torta | `#9D7F68` | `#E2D0BB` |

Reglas de uso:
- El fondo de la página es oscuro y cálido, no negro puro: `#14080A` como base y `#1E0D10` para superficies.
- El dorado `#C8A349` es el único color de acento global (líneas finas, tipografía de énfasis, CTA secundario).
- Cada ficha de producto toma su color `--producto` y lo usa para el fondo de sección, el halo de la botella y el cursor. Una sola variable CSS cambia toda la sección.
- Rojo `#B11E2F` solo para el CTA principal de WhatsApp.
- Contraste: texto sobre fondo oscuro mínimo 4.5:1. Verificar cada combinación nueva antes de fijarla.

Los hex salen de un promedio de zonas y cuantización a 5 colores; son un punto de partida, se afinan sobre las fotos finales.

## Tipografía

- Titulares: serif de alto contraste y carácter editorial (candidata: Fraunces o Playfair Display, ambas en Google Fonts), tamaños grandes, interlínea ajustada.
- Cuerpo y UI: Inter (ya instalada).
- Números de precio o cantidades: Inter con `tabular-nums`.
- Escala fluida con `clamp()`: titular principal entre 2.5 y 7 rem.

## Dirección de movimiento

Referencia indicada por el propietario: el trabajo de Immersive Garden (Awwwards), estudio parisino de producción digital con proyectos de relojería y lujo. Lo que se toma como principio: el movimiento cuenta la historia del producto y guía la atención; nunca decora. No se copia ninguna mecánica concreta de sus sitios.

Principios:
1. **Una idea de movimiento por pantalla.** Si compiten dos, se elimina una.
2. **El producto es el protagonista.** La botella entra, se detiene y el entorno reacciona (partículas, líquido, luz), no al revés.
3. **Easing consistente.** Una curva de entrada `cubic-bezier(0.22, 1, 0.36, 1)` y una de salida `cubic-bezier(0.64, 0, 0.78, 0)`. Duraciones: micro 150-250 ms, transición de elemento 500-800 ms, transición de página 700-1000 ms.
4. **Scroll como narración.** Scroll suave con inercia y secciones que se anclan o revelan por progreso, sin secuestrar el scroll en móvil.
5. **Transiciones entre páginas continuas.** La imagen del producto de la tarjeta se convierte en la imagen de la ficha (shared element), no hay corte en blanco.
6. **Degradación elegante.** Sin JavaScript o con `prefers-reduced-motion`, el sitio muestra el contenido final sin animar.

Piezas propuestas, por fases:

| Fase | Pieza | Técnica |
|---|---|---|
| 1 | Hero con botella central, fondo que cambia de color por producto al desplazarse | GSAP + ScrollTrigger, Lenis |
| 1 | Revelado de titulares por línea (máscara y desplazamiento) | GSAP SplitText o implementación propia |
| 1 | Transición de página con elemento compartido | View Transitions API con respaldo en framer-motion |
| 1 | Cursor con halo del color del producto (solo puntero fino) | CSS variables + requestAnimationFrame |
| 2 | Showroom horizontal de productos con parallax de profundidad | GSAP, imágenes con recorte por capas |
| 2 | Partículas finas de luz dorada (bokeh) detrás de la botella | Canvas 2D ligero |
| 3 | Botella en 3D con rotación al arrastrar | react-three-fiber, carga diferida, solo escritorio |

Presupuesto de rendimiento: JS inicial de la home menor a 200 kB gzip, animaciones solo sobre `transform` y `opacity`, `will-change` únicamente durante la animación, 3D cargado bajo demanda.

## Composición

- Retícula de 12 columnas con márgenes generosos y mucho espacio negativo; la botella rompe la retícula, el texto no.
- Fotos de producto a sangre, con viñeta suave para integrar el fondo oscuro.
- Sellos de advertencia siempre visibles y a tamaño legible, sin competir con el titular.
- Móvil primero: el 90% de los leads llegan a WhatsApp desde el celular. Botón flotante de WhatsApp siempre accesible.

## Tokens

Los tokens viven en `app/globals.css` como variables CSS y se exponen en `tailwind.config.ts` (`colors.uva`, `colors.cereza`, etc.). Ningún componente usa hex directos. Al agregar un producto: ver "Cómo agregar un producto" en `docs/WORKFLOW.md`.
