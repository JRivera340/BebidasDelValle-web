# 📸 Guía para Cambiar las Imágenes

## Estado Actual

El sitio actualmente usa **imágenes profesionales de Unsplash** como placeholders. Son de buena calidad pero son genéricas (no son fotos reales de tus productos).

---

## 🎯 Cómo Reemplazar con tus Imágenes Reales

### Método 1: Imágenes Locales (Recomendado)

Este es el método más simple y no requiere servicios externos.

#### Paso 1: Prepara tus imágenes

**Productos (6 imágenes necesarias):**
- Vino de Cereza → `cereza.jpg`
- Vino de Manzana → `manzana.jpg`
- Vino Moscatel → `moscatel.jpg`
- Harina para Natilla → `natilla.jpg`
- Harina para Buñuelo → `bunuelo.jpg`
- Harina sabor Arequipe → `arequipe.jpg`

**Colecciones (3 imágenes necesarias):**
- Colección Rojo → `red.jpg`
- Colección Dorado → `gold.jpg`
- Colección Blanco → `white.jpg`

**Especificaciones técnicas:**
- **Formato:** JPG (recomendado), PNG o WebP
- **Dimensiones productos:** 800x600px (proporción 4:3)
- **Dimensiones colecciones:** 1200x800px
- **Peso:** Máximo 200KB por imagen (comprimir si es necesario)
- **Calidad:** 80-85% (balancea calidad y tamaño)

#### Paso 2: Coloca las imágenes en las carpetas

```
public/
  img/
    vinos/
      cereza.jpg     ← Tu foto del vino de cereza
      manzana.jpg    ← Tu foto del vino de manzana
      moscatel.jpg   ← Tu foto del vino moscatel
    harinas/
      natilla.jpg    ← Tu foto de la harina natilla
      bunuelo.jpg    ← Tu foto de la harina buñuelo
      arequipe.jpg   ← Tu foto de la harina arequipe
    collections/
      red.jpg        ← Imagen para colección roja
      gold.jpg       ← Imagen para colección dorada
      white.jpg      ← Imagen para colección blanca
```

#### Paso 3: Actualiza el archivo de productos

Abre `lib/products.ts` y cambia las URLs:

**ANTES (actual):**
```typescript
{
  id: 'vino-cereza',
  name: 'Vino de Cereza',
  images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop&q=80'],
  // ...
}
```

**DESPUÉS (con tu imagen):**
```typescript
{
  id: 'vino-cereza',
  name: 'Vino de Cereza',
  images: ['/img/vinos/cereza.jpg'],  // ← Cambia solo esta línea
  // ...
}
```

Repite para todos los productos y colecciones.

#### Paso 4: Listo!

```bash
npm run dev  # Reinicia el servidor si está corriendo
```

Visita http://localhost:3000 y verás tus imágenes.

---

### Método 2: Usar un CDN o Servicio de Imágenes

Si prefieres alojar las imágenes en un servicio externo (Cloudinary, AWS S3, etc.):

#### Paso 1: Sube tus imágenes al servicio

Por ejemplo, si usas Cloudinary, obtendrás URLs como:
```
https://res.cloudinary.com/tu-cuenta/image/upload/v123456/vino-cereza.jpg
```

#### Paso 2: Actualiza `lib/products.ts`

```typescript
{
  id: 'vino-cereza',
  name: 'Vino de Cereza',
  images: ['https://res.cloudinary.com/tu-cuenta/image/upload/v123456/vino-cereza.jpg'],
  // ...
}
```

#### Paso 3: Agrega el dominio en `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  // Tu dominio CDN
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',  // Deja esto por ahora
      },
    ],
  },
}

module.exports = nextConfig
```

---

## 🛠️ Herramientas para Optimizar Imágenes

Antes de subir, optimiza tus imágenes:

### Online (Gratis)
- **[Squoosh](https://squoosh.app/)** - La mejor, sin pérdida notable de calidad
- **[TinyPNG](https://tinypng.com/)** - Específica para PNG/JPG
- **[Compress JPEG](https://compressjpeg.com/)** - Solo JPEG

### Recomendaciones:
1. Redimensiona primero al tamaño exacto (800x600 o 1200x800)
2. Luego comprime con calidad 80-85%
3. Convierte a WebP si es posible (mejor que JPG)

---

## 📋 Checklist de Cambio de Imágenes

- [ ] Preparar 6 fotos de productos
- [ ] Preparar 3 fotos de colecciones
- [ ] Redimensionar a tamaños correctos
- [ ] Comprimir (cada imagen < 200KB)
- [ ] Colocar en carpetas `public/img/`
- [ ] Actualizar URLs en `lib/products.ts`
- [ ] Probar en `npm run dev`
- [ ] Verificar que todas las imágenes cargan
- [ ] Build final: `npm run build`
- [ ] Deploy a producción

---

## 🎨 Tips de Fotografía de Productos

Para mejores resultados:

1. **Fondo neutro:** Blanco o de color sólido
2. **Iluminación natural:** Evita sombras duras
3. **Ángulo:** Ligeramente desde arriba (45°)
4. **Enfoque:** En el producto, fondo levemente desenfocado
5. **Consistencia:** Misma iluminación y estilo para todos

---

## ❓ Problemas Comunes

### Las imágenes no cargan

1. Verifica que los nombres coincidan exactamente (mayúsculas/minúsculas)
2. Confirma que las rutas empiecen con `/img/`
3. Reinicia el servidor de desarrollo

### Las imágenes se ven pixeladas

- Sube imágenes de mayor resolución
- Mínimo: 800x600px para productos
- Mínimo: 1200x800px para colecciones

### Las imágenes pesan mucho

- Usa herramientas de compresión online
- Convierte a WebP (mejor compresión)
- Objetivo: < 200KB por imagen

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas cambiando las imágenes:

1. Revisa que los nombres de archivo sean exactos
2. Verifica las rutas en `lib/products.ts`
3. Mira la consola del navegador para errores
4. Confirma que `public/img/` tenga las carpetas correctas

---

**Última actualización:** 28 de octubre, 2025

