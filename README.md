# Bebidas del Valle

Sitio web de catálogo para **Bebidas del Valle**, marca de vinos artesanales y harinas tradicionales. Diseñado para cestas personalizadas y regalos corporativos.

## 🎨 Características

- **Next.js 14** con App Router y TypeScript
- **Diseño showroom dinámico** con accordion-slider (Framer Motion)
- **Paleta rojo/dorado/blanco** corporativa
- **CTAs por WhatsApp** con mensajes prellenados y UTM tracking
- **ISR/SSG** para performance óptima
- **SEO técnico** con JSON-LD, Open Graph, sitemaps
- **Accesibilidad** AA (WCAG 2.1)
- **Componentes UI** con shadcn/ui + Tailwind CSS

## 🚀 Inicio rápido

### Requisitos previos

- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Configuración

### 1. Número de WhatsApp

Edita `lib/whatsapp.ts`:

```typescript
export const PHONE = '573XXXXXXXXX' // Reemplazar con tu número en formato internacional
```

### 2. Google Analytics

Edita `app/layout.tsx` y reemplaza `GA_MEASUREMENT_ID` con tu ID de GA4:

```typescript
gtag('config', 'TU_GA_MEASUREMENT_ID');
```

O crea un archivo `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

### 3. SEO

Edita `lib/seo.ts` para ajustar:
- `SITE_NAME`
- `SITE_URL`
- `SITE_DESCRIPTION`

## 📦 Añadir productos

1. Abre `lib/products.ts`
2. Añade un nuevo objeto al array `PRODUCTS`:

```typescript
{
  id: 'nuevo-producto',
  slug: 'nuevo-producto',
  name: 'Nuevo Producto',
  category: 'vinos', // o 'harinas'
  variants: [{ name: '750 ml', sku: 'NVO-750' }],
  description: 'Descripción del producto...',
  tags: ['selección', 'obsequio'],
  images: ['/img/nuevo-producto.jpg'],
  available: true,
  badges: ['Edición especial'],
}
```

3. Añade la imagen del producto en `public/img/vinos/` o `public/img/harinas/`

## 🎨 Reemplazar imágenes con las tuyas propias

Actualmente el proyecto usa imágenes de Unsplash (placeholder profesionales). Para usar tus imágenes reales:

### Opción 1: Imágenes locales (Recomendado)

1. **Coloca tus imágenes en:**
   - `public/img/vinos/` - para vinos (cereza.jpg, manzana.jpg, moscatel.jpg)
   - `public/img/harinas/` - para harinas (natilla.jpg, bunuelo.jpg, arequipe.jpg)
   - `public/img/collections/` - para colecciones (red.jpg, gold.jpg, white.jpg)

2. **Actualiza `lib/products.ts`:**
```typescript
// Ejemplo para Vino de Cereza
images: ['/img/vinos/cereza.jpg']  // Cambia la URL de Unsplash por tu ruta local
```

3. **Formatos y dimensiones:**
   - Formatos: JPG, PNG, WebP o AVIF
   - Productos: 800x600px (proporción 4:3)
   - Colecciones: 1200x800px
   - Peso optimizado: < 200KB por imagen

### Opción 2: Mantener URLs externas

Si prefieres usar un CDN o servicio de imágenes:

1. Sube tus imágenes a un servicio (Cloudinary, Imgix, etc.)
2. Actualiza las URLs en `lib/products.ts`
3. Agrega el hostname en `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'tu-cdn.com',  // Tu dominio
    },
  ],
}
```

## 🛠️ Scripts disponibles

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Ejecutar build
pnpm start

# Linter
pnpm lint
```

## 🚢 Deploy a Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Paso a paso:

1. **Conecta tu repositorio**
   - Sube el código a GitHub/GitLab/Bitbucket
   - Conecta en Vercel → New Project

2. **Variables de entorno** (opcional):
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_SITE_URL=https://tudominio.com
   ```

3. **Deploy**
   - Vercel detectará Next.js automáticamente
   - Build command: `next build`
   - Output directory: `.next`

4. **Dominio personalizado**
   - Settings → Domains → Add Domain
   - Configura DNS según las instrucciones de Vercel

5. **Sitemap**
   - El sitemap se genera automáticamente en `/sitemap.xml`
   - Envía a Google Search Console

## 📁 Estructura del proyecto

```
.
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx          # Layout principal + navegación
│   ├── page.tsx            # Home
│   ├── catalogo/           # Catálogo completo
│   ├── categoria/[slug]/   # Páginas por categoría
│   ├── producto/[slug]/    # Páginas de producto
│   ├── colecciones/        # Showroom de colecciones
│   └── empresa/            # Pedidos corporativos
├── components/
│   ├── AccordionShowroom.tsx  # Componente principal showroom
│   ├── ProductCard.tsx        # Tarjeta de producto
│   ├── ProductGallery.tsx     # Galería de imágenes
│   ├── Filters.tsx            # Filtros de catálogo
│   └── ui/                    # Componentes shadcn/ui
├── lib/
│   ├── types.ts            # Tipos TypeScript
│   ├── products.ts         # Datos de productos
│   ├── whatsapp.ts         # Utilidades WhatsApp
│   ├── seo.ts              # Utilidades SEO
│   └── analytics.ts        # Tracking GA4
├── public/
│   └── img/                # Imágenes de productos
└── tailwind.config.ts      # Configuración Tailwind
```

## 🎯 Restricciones de contenido

**IMPORTANTE:** El sitio NO usa lenguaje alusivo a festividades específicas:

❌ **No usar:** Navidad, navideño, aguinaldo, nochebuena, emojis festivos

✅ **Usar:** 
- Cestas personalizadas
- Regalos corporativos
- Selección de temporada
- Presentación para obsequio
- Listo para regalo

## 🧪 Criterios de aceptación

- [ ] Home carga en < 1.5s (Vercel)
- [ ] AccordionShowroom funciona con mouse y teclado
- [ ] Panel activo ocupa >55% del ancho
- [ ] CTAs de WhatsApp incluyen UTM y slug
- [ ] Filtros funcionan en /catalogo
- [ ] JSON-LD válido en páginas de producto
- [ ] Sin palabras alusivas a festividades
- [ ] Lighthouse: Performance >90, Accesibilidad >95, SEO >95

## 📊 Analítica

El sitio incluye tracking de eventos GA4:

- `generate_lead` - Clics en WhatsApp
- `view_item` - Vistas de producto
- `begin_checkout` - Inicio de armado de cesta
- `select_content` - Interés en colecciones

Configura los eventos personalizados en tu panel de GA4.

## 🎨 Personalización de marca

### Colores

Edita `tailwind.config.ts`:

```typescript
brand: {
  red: {
    DEFAULT: "#B11E2F",
    hover: "#9A1A29",
  },
  gold: {
    DEFAULT: "#C8A349",
    hover: "#B28F3F",
  },
  white: "#FFFFFF",
},
```

### Nombre de marca

Busca y reemplaza "ALMA" en:
- `app/layout.tsx` (Header, Footer)
- `lib/seo.ts` (SITE_NAME)

## 🐛 Solución de problemas

### Error: Module not found

```bash
# Reinstalar dependencias
rm -rf node_modules .next
pnpm install
```

### Imágenes no cargan

- Verifica que las rutas en `lib/products.ts` coincidan con las de `public/img/`
- Las rutas deben empezar con `/img/...`

### Build falla en Vercel

- Verifica que todas las imágenes existan
- Revisa los logs en Vercel Dashboard
- Asegúrate de que `next-sitemap` esté instalado

## 📄 Licencia

© 2025 Bebidas del Valle - ALMA. Todos los derechos reservados.

## 🤝 Soporte

Para soporte técnico o consultas:
- WhatsApp: +57 311 344 0504
- Email: contacto@ejemplo.com

---

Desarrollado con ❤️ usando Next.js 14, TypeScript y Tailwind CSS
