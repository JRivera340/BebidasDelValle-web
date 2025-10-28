# Guía de Deployment - Bebidas del Valle ALMA

## ✅ Checklist Pre-Deployment

### 1. Configuración de marca
- [ ] Reemplazar número de WhatsApp en `lib/whatsapp.ts`
- [ ] Actualizar nombre de marca "ALMA" en `app/layout.tsx` si es necesario
- [ ] Configurar colores de marca en `tailwind.config.ts` si se requiere ajuste

### 2. Contenido
- [ ] Reemplazar imágenes placeholder en `public/img/` con imágenes reales
- [ ] Verificar que todos los productos en `lib/products.ts` sean correctos
- [ ] Revisar descripciones y eliminar cualquier placeholder text

### 3. SEO
- [ ] Actualizar `SITE_URL` en `lib/seo.ts`
- [ ] Configurar Google Analytics ID en `app/layout.tsx`
- [ ] Crear archivo `.env.local` con variables de entorno

### 4. Verificación de contenido neutro
- [ ] Buscar y eliminar cualquier referencia a "Navidad", "navideño", etc.
- [ ] Confirmar que solo se usa lenguaje como "cestas personalizadas", "regalos corporativos"

## 🚀 Deploy a Vercel (Recomendado)

### Opción 1: Deploy desde GitHub

1. **Sube tu código a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - Bebidas del Valle MVP"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

2. **Conecta con Vercel:**
- Ve a [vercel.com](https://vercel.com)
- Click en "New Project"
- Importa tu repositorio de GitHub
- Vercel detectará Next.js automáticamente

3. **Variables de entorno:**
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

4. **Deploy:**
- Click "Deploy"
- Espera ~2 minutos
- Tu sitio estará en `https://tu-proyecto.vercel.app`

### Opción 2: Deploy directo con Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## 🌐 Configurar Dominio Personalizado

1. En Vercel Dashboard → Settings → Domains
2. Add Domain → Ingresa tu dominio
3. Configura los DNS según las instrucciones:
   - Tipo: A Record
   - Valor: 76.76.21.21
   - O CNAME: cname.vercel-dns.com

## 📊 Configurar Google Analytics

1. Crea una propiedad GA4 en [analytics.google.com](https://analytics.google.com)
2. Copia el Measurement ID (G-XXXXXXXXXX)
3. Agrégalo en Vercel:
   - Settings → Environment Variables
   - Nombre: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Valor: `G-XXXXXXXXXX`
4. Redeploy el proyecto

## 🔍 SEO Post-Deployment

### Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad (dominio o prefijo URL)
3. Verifica propiedad:
   - **Método DNS:** Agrega TXT record
   - **Método HTML:** Descarga archivo y súbelo a `public/`

4. Envía el sitemap:
   - URL: `https://tudominio.com/sitemap.xml`

### Robots.txt

El archivo se genera automáticamente en `public/robots.txt`.
Actualiza el dominio después del primer deploy:

```txt
User-agent: *
Allow: /

Host: https://tudominio.com
Sitemap: https://tudominio.com/sitemap.xml
```

## 📱 WhatsApp Business API (Opcional)

Para trackear mejor las conversiones:

1. Crea cuenta de [WhatsApp Business](https://business.whatsapp.com/)
2. Conecta tu número
3. Configura mensajes automáticos de bienvenida
4. Usa la misma estructura de mensaje que en `lib/whatsapp.ts`

## 🎨 Optimización de imágenes

Antes del deploy, optimiza todas las imágenes:

### Herramientas recomendadas:
- [Squoosh](https://squoosh.app/) - Online, gratis
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [AVIF.io](https://avif.io/) - Convertir a AVIF (mejor que WebP)

### Configuración ideal:
- Formato: AVIF > WebP > JPG
- Calidad: 80-85%
- Productos: 800x600px max
- Colecciones: 1200x800px max
- Peso: < 150KB por imagen

## 📈 Monitoreo Post-Launch

### Lighthouse CI (Opcional)

```bash
npm install -g @lhci/cli
lhci autorun --collect.url=https://tudominio.com
```

### Métricas objetivo:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🔒 Seguridad

### Headers de seguridad (next.config.js)

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 🔄 Actualizaciones continuas

### Workflow recomendado:

1. **Desarrollo local:**
```bash
git checkout -b feature/nueva-funcionalidad
# Hacer cambios
npm run build # Verificar que compila
git commit -m "Descripción del cambio"
git push origin feature/nueva-funcionalidad
```

2. **Preview en Vercel:**
- Vercel crea automáticamente un deploy preview
- Prueba en: `https://tu-proyecto-branch.vercel.app`

3. **Merge a main:**
```bash
git checkout main
git merge feature/nueva-funcionalidad
git push origin main
```

4. **Production deploy:**
- Vercel deploya automáticamente a producción

## 🆘 Troubleshooting

### Build falla en Vercel

**Error:** "Module not found"
```bash
# Local: Limpiar y reinstalar
rm -rf node_modules .next
npm install
npm run build
```

### Imágenes no cargan

- Verifica que las rutas empiecen con `/img/`
- Confirma que los archivos existan en `public/img/`
- Revisa la consola del browser para errores 404

### WhatsApp links no funcionan

- Verifica el formato del número: `573XXXXXXXXX` (código país + número)
- Prueba el link directamente: `https://wa.me/573XXXXXXXXX`

### Sitemap no se genera

```bash
npm run build
# Debe ejecutar next-sitemap automáticamente
```

Si falla:
```bash
npx next-sitemap
```

## 📞 Soporte

- Documentación Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Help: [vercel.com/support](https://vercel.com/support)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

✅ **Una vez completado este checklist, tu sitio estará listo para producción!**

