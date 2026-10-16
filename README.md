# Bebidas del Valle

Sitio web de catálogo y generación de leads de Bebidas del Valle (Cali, Colombia). Muestra los productos, las colecciones y la página de pedidos corporativos; cada llamada a la acción termina en WhatsApp con mensaje prellenado, UTM y origen del clic.

## Requisitos

- Node.js 20 o superior
- npm

## Puesta en marcha

```bash
npm ci
cp .env.example .env.local   # completar las variables
npm run dev                  # http://localhost:3000
```

## Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio público: metadata, sitemap y JSON-LD |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID de Google Analytics 4 (si falta, no se carga) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número comercial en formato internacional, sin signos |

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción y generación de sitemap |
| `npm run start` | Sirve la compilación |
| `npm run lint` / `npm run typecheck` | Revisión estática |
| `npm test` | Pruebas unitarias y de componentes (Vitest) |
| `npm run test:e2e` | Pruebas de extremo a extremo (Playwright) |
| `npm run check` | Lint, tipos, pruebas y build |

## Documentación

Todo el detalle está en `docs/`:

- `REGLAS.md`: reglas permanentes del proyecto
- `PRODUCTOS.md`: catálogo y estado de los datos
- `MARCA-Y-DISENO.md`: paleta, tipografía y movimiento
- `ARQUITECTURA.md`: estructura, rutas, datos y SEO
- `WORKFLOW.md`: ramas, commits y revisión
- `DESPLIEGUE-RAILWAY.md`: despliegue y operación
- `BACKLOG.md`: pendientes y decisiones abiertas
- `AUDITORIA.md`: revisión técnica y línea base
