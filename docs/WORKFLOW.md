# Workflow

Reglas de trabajo para que el proyecto escale sin perder coherencia. La idea central: la documentación es parte del código y se revisa en el mismo PR.

## Ramas

- `main`: siempre desplegable. Cada merge dispara despliegue en Railway.
- `feat/<tema>`, `fix/<tema>`, `docs/<tema>`: ramas cortas desde `main`.
- Sin commits directos a `main`. PR obligatorio, aunque sea de una sola persona: deja trazabilidad y activa el entorno de revisión.

## Commits

Conventional Commits en español, una intención por commit:

```
feat(home): hero con transición de color por producto
fix(catalogo): filtrar por categoría bebidas
docs(productos): actualizar estado de ingredientes
chore(deps): quitar zod sin uso
```

Mensaje de una sola línea, sin cuerpo ni listas.

## Ciclo de un cambio

1. Revisar `docs/BACKLOG.md` y tomar un ítem (o agregarlo).
2. Rama nueva desde `main`.
3. Implementar. Si toca datos, diseño, arquitectura o despliegue, actualizar el documento correspondiente (tabla de abajo).
4. `npm run check` en local y repaso de la lista de "Definición de terminado".
5. PR con la plantilla de abajo. Revisar el entorno de PR en Railway en móvil real.
6. Merge a `main`. Verificar el despliegue y marcar el ítem del backlog.

## Contrato docs-código

| Si cambia... | Se actualiza... |
|---|---|
| `lib/products.ts`, `public/img/productos/` | `docs/PRODUCTOS.md` (tabla de productos y estado de datos) |
| `tailwind.config`, `globals.css`, nuevas animaciones | `docs/MARCA-Y-DISENO.md` |
| Rutas, carpetas, dependencias, SEO | `docs/ARQUITECTURA.md` |
| Variables de entorno, scripts de build, plataforma | `docs/DESPLIEGUE-RAILWAY.md` y `.env.example` |
| Regla de negocio nueva o decisión tomada | `docs/REGLAS.md` si es regla permanente; `docs/BACKLOG.md` si es decisión puntual |

Antes de abrir el PR se compara el diff contra esta tabla y se completa lo que falte.

## Plantilla de PR

```
## Qué cambia
## Por qué
## Cómo se probó (móvil / escritorio / reduced-motion)
## Documentación actualizada
- [ ] PRODUCTOS  - [ ] MARCA-Y-DISENO  - [ ] ARQUITECTURA  - [ ] DESPLIEGUE  - [ ] BACKLOG  - [ ] No aplica
```

## Definición de terminado

- `npm run lint` y `npm run build` sin errores.
- Sin hex directos en componentes; solo tokens.
- Animaciones con `prefers-reduced-motion`.
- Imágenes con `alt` descriptivo y dimensiones declaradas.
- Sin lenguaje festivo explícito en textos visibles (la prueba de datos busca las palabras prohibidas).
- Sellos de advertencia presentes en toda ficha.
- Eventos GA4 y UTM presentes en cada CTA nuevo.
- Docs actualizados según el contrato.

## Cómo agregar un producto

Pasos: imagen con nombre según convención, entrada en `lib/products.ts` con sellos y `datosConfirmados`, token de color si es nuevo, fila en `docs/PRODUCTOS.md`, revisión del sitemap.

## Cadencia sugerida

- Semanal: revisar backlog, cerrar decisiones abiertas con el cliente.
- Antes de cada entrega al cliente: `npm run check`, Lighthouse móvil (guardar el resultado en el PR) y revisión de datos sin confirmar.
- Mensual: dependencias (`npm outdated`) y poda de documentación obsoleta.
