# Despliegue en Railway

Migración desde Vercel. Los pasos asumen un proyecto Next.js 14 con npm. Los nombres de menús y límites de Railway cambian con el tiempo: confirmar contra la documentación oficial (docs.railway.com) antes de ejecutar.

## Antes de migrar

1. Crear `.env.example` con las tres variables de `ARQUITECTURA.md`.
2. Fijar la versión de Node en `package.json`:
   ```json
   "engines": { "node": ">=20" }
   ```
3. Confirmar que `npm run build` corre limpio en local con las variables definidas (el `postbuild` genera sitemap y robots).
4. Limpiar la documentación de Vercel que ya no aplica (ver `BACKLOG.md`).
5. Restringir `images.remotePatterns` en `next.config.js` a hosts reales.

## Pasos

1. En Railway: nuevo proyecto, "Deploy from GitHub repo", elegir `JRivera340/BebidasDelValle-web`, rama `main`.
2. Variables (pestaña Variables) **antes del primer build**, porque `NEXT_PUBLIC_*` se incrustan al compilar:
   - `NEXT_PUBLIC_SITE_URL` (dominio final con https)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. Comandos: build `npm run build`, inicio `npm run start`. Railway detecta Next.js por sí solo; solo se fijan si la detección falla.
4. Healthcheck sobre `/`.
5. Generar el dominio de Railway y probar toda la ruta de conversión (CTA, UTM, WhatsApp) en móvil.
6. Dominio propio: agregarlo en Settings, crear el registro CNAME que indique Railway en el DNS, esperar certificado.
7. Mantener Vercel activo mientras se valida; cambiar el DNS al final y dejar Vercel como respaldo unos días.
8. Tras el corte: reenviar el sitemap a Google Search Console con el dominio definitivo.

## Operación

- Despliegue automático en cada merge a `main`.
- Entornos de PR: activarlos en Railway para revisar cada rama en una URL propia.
- Reversión: redeploy de un despliegue anterior desde la pestaña Deployments.
- Logs y métricas en el panel; alerta de uso si el plan tiene tope de crédito.
- Cambiar una variable `NEXT_PUBLIC_*` obliga a redeploy.

## Verificación posterior

- [ ] Home, catálogo, una ficha y empresa cargan sin errores de consola.
- [ ] `sitemap.xml` y `robots.txt` apuntan al dominio final.
- [ ] GA4 recibe eventos en tiempo real.
- [ ] Los CTA abren WhatsApp con mensaje y UTM correctos.
- [ ] Imágenes sirven en AVIF/WebP.
- [ ] Lighthouse móvil guardado como línea base.

## Riesgos conocidos

- Número de WhatsApp inconsistente entre código y etiquetas (ver `PRODUCTOS.md`).
- Cambio de dominio sin redirecciones puede perder posicionamiento si el sitio ya estaba indexado.
- Costos: revisar el plan vigente y el consumo real tras la primera semana, no asumir cifras.
