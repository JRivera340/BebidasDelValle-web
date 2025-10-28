# Mapa de Rutas - Bebidas del Valle ALMA

## 📍 Rutas Públicas

### Página Principal
**URL:** `/`
**Archivo:** `app/page.tsx`
**Tipo:** Static (○)
**Características:**
- Hero con gradiente rojo/dorado
- 3 features destacados
- AccordionShowroom de colecciones
- Grid de 3 productos destacados
- CTA final para cestas personalizadas

**CTAs:**
- "Armar mi cesta" → WhatsApp (waBasketMessage)
- "Explorar catálogo" → /catalogo
- "Consultar por WhatsApp" → Por producto

---

### Catálogo Completo
**URL:** `/catalogo`
**Archivo:** `app/catalogo/page.tsx`
**Tipo:** Static (○)
**Características:**
- Sidebar con filtros
- Grid responsive de productos
- Búsqueda en tiempo real
- Filtro por categoría (vinos/harinas)
- Toggle "Solo disponibles"
- Contador de resultados

**Filtros:**
- Búsqueda: nombre, descripción, tags
- Categoría: all, vinos, harinas
- Disponibilidad: checkbox

---

### Categorías
**URL:** `/categoria/[slug]`
**Archivos:** `app/categoria/[slug]/page.tsx`
**Tipo:** SSG (●)
**Rutas generadas:**
- `/categoria/vinos`
- `/categoria/harinas`

**Características:**
- Breadcrumb navigation
- Descripción de categoría
- Grid filtrado de productos
- JSON-LD BreadcrumbList

**Metadata dinámica:**
```typescript
title: "Vinos - Catálogo" | "Harinas - Catálogo"
description: Específica por categoría
```

---

### Producto Individual
**URL:** `/producto/[slug]`
**Archivo:** `app/producto/[slug]/page.tsx`
**Tipo:** SSG (●)
**Rutas generadas:**
- `/producto/vino-cereza`
- `/producto/vino-manzana`
- `/producto/vino-moscatel`
- `/producto/harina-natilla`
- `/producto/harina-bunuelo`
- `/producto/harina-arequipe`

**Características:**
- Breadcrumb navigation
- ProductGallery con zoom
- Info detallada del producto
- Listado de variantes
- Badges y tags
- Features (empaque, entrega)
- CTA WhatsApp prominente
- Productos relacionados (3)
- Floating WhatsApp button (móvil)

**Structured Data:**
- Product JSON-LD
- BreadcrumbList JSON-LD

---

### Colecciones
**URL:** `/colecciones`
**Archivo:** `app/colecciones/page.tsx`
**Tipo:** Static (○)
**Características:**
- Hero descriptivo
- AccordionShowroom full-width
- Detalle de cada colección:
  - CollectionBadge
  - Descripción
  - Features list
  - Productos incluidos
  - CTA WhatsApp
- CTA final para colección personalizada

**3 Colecciones:**
1. Rojo Clásico (Vino de Cereza)
2. Dorado Premium (Moscatel + Arequipe)
3. Blanco Esencial (Manzana + Natilla + Buñuelo)

---

### Empresa / Corporativo
**URL:** `/empresa`
**Archivo:** `app/empresa/page.tsx`
**Tipo:** Static (○)
**Características:**
- Hero corporativo
- 4 beneficios destacados
- Tabla de descuentos por volumen:
  - 10-49: 5%
  - 50-99: 10%
  - 100-199: 15%
  - 200+: 20%+
- Formulario de cotización (cantidad + ciudad)
- FAQ section (3 preguntas)

**Formulario:**
- Input: Cantidad (number, min: 10)
- Input: Ciudad (text)
- Submit → waVolumeMessage(cantidad, ciudad)

---

### 404 Not Found
**URL:** cualquier ruta no definida
**Archivo:** `app/not-found.tsx`
**Tipo:** Static (○)
**Características:**
- Mensaje "404" grande
- Descripción amigable
- 2 CTAs:
  - "Volver al inicio" → /
  - "Ver catálogo" → /catalogo

---

## 🧭 Navegación Principal (Header)

Implementado en `app/layout.tsx` → `Header()`

**Links:**
- Logo "ALMA" → `/`
- Inicio → `/`
- Catálogo → `/catalogo`
- Colecciones → `/colecciones`
- Empresa → `/empresa`

**Responsive:**
- Desktop: Nav horizontal
- Mobile: Burger menu (pendiente implementar funcionalidad)

---

## 🦶 Footer Links

Implementado en `app/layout.tsx` → `Footer()`

**Columna 1 - Navegación:**
- Catálogo → `/catalogo`
- Colecciones → `/colecciones`
- Pedidos corporativos → `/empresa`

**Columna 2 - Categorías:**
- Vinos → `/categoria/vinos`
- Harinas → `/categoria/harinas`

**Columna 3 - Contacto:**
- WhatsApp: +57 311 344 0504

---

## 🔗 Links Internos

### Desde Home (/)
```
→ /catalogo (CTA "Explorar catálogo")
→ /colecciones (dentro de AccordionShowroom)
→ /producto/[slug] (3 productos destacados)
→ WhatsApp (CTA "Armar mi cesta")
```

### Desde Catálogo (/catalogo)
```
→ /producto/[slug] (cada ProductCard)
→ WhatsApp (CTA por producto)
```

### Desde Categoría (/categoria/[slug])
```
→ / (breadcrumb)
→ /catalogo (breadcrumb)
→ /producto/[slug] (cada ProductCard)
```

### Desde Producto (/producto/[slug])
```
→ / (breadcrumb)
→ /catalogo (breadcrumb)
→ /categoria/[slug] (breadcrumb)
→ /producto/[slug] (productos relacionados)
→ WhatsApp (CTA principal + floating button)
```

### Desde Colecciones (/colecciones)
```
→ /producto/[slug] (productos de cada colección)
→ WhatsApp (CTA por colección)
→ /colecciones (link "Ver todas" desde home)
```

### Desde Empresa (/empresa)
```
→ WhatsApp (formulario de cotización)
```

---

## 🌐 URLs Externas

Todas apuntan a WhatsApp con diferentes mensajes:

### WhatsApp - Producto
```
https://wa.me/573113440504?text=Hola%2C%20me%20interesa%20{nombre}...
utm_source=web&utm_medium=cta&utm_campaign=whatsapp_producto
```

### WhatsApp - Cesta
```
https://wa.me/573113440504?text=Hola%2C%20me%20gustaría%20armar...
utm_source=web&utm_medium=cta&utm_campaign=whatsapp_cesta
```

### WhatsApp - Volumen
```
https://wa.me/573113440504?text=Hola%2C%20necesito%20cotizar...
utm_source=web&utm_medium=cta&utm_campaign=whatsapp_volumen
```

---

## 📄 Rutas de Sistema

### Sitemap
**URL:** `/sitemap.xml`
**Generado por:** `next-sitemap`
**Incluye:**
- Todas las páginas estáticas
- Todas las páginas dinámicas generadas
- Prioridad y changefreq configurables

### Robots
**URL:** `/robots.txt`
**Archivo:** `public/robots.txt`
**Configuración:**
```txt
User-agent: *
Allow: /
Host: https://example.com
Sitemap: https://example.com/sitemap.xml
```

---

## 🎯 Rutas por Objetivo de Usuario

### "Quiero ver productos"
```
/ → /catalogo → /producto/[slug] → WhatsApp
```

### "Busco vinos"
```
/ → /categoria/vinos → /producto/vino-[tipo] → WhatsApp
```

### "Necesito una cesta corporativa"
```
/ → /empresa → Formulario → WhatsApp
```

### "Quiero ver colecciones"
```
/ → AccordionShowroom → /colecciones → WhatsApp
```

---

## 📊 Estadísticas de Rutas

**Total de páginas:** 15 (en build)
- Estáticas: 5 (/, /catalogo, /colecciones, /empresa, /not-found)
- Dinámicas (SSG): 8 (2 categorías + 6 productos)
- Sistema: 2 (/sitemap.xml, /robots.txt)

**Profundidad máxima:** 3 niveles
```
/ → /categoria/[slug] → /producto/[slug]
```

**Salidas a WhatsApp:** ~30+ CTAs en total
- Home: 2 CTAs
- Catálogo: 6 CTAs (1 por producto)
- Producto: 1 CTA principal + floating
- Colecciones: 4 CTAs (1 por colección + general)
- Empresa: 1 CTA

---

## 🔍 SEO Score por Página

Estimado según mejores prácticas:

| Página | Meta | JSON-LD | Breadcrumb | Images | Score |
|--------|------|---------|------------|--------|-------|
| / | ✓ | Organization | - | ✓ | 95/100 |
| /catalogo | ✓ | - | - | ✓ | 90/100 |
| /categoria/* | ✓ | Breadcrumb | ✓ | ✓ | 95/100 |
| /producto/* | ✓ | Product + Breadcrumb | ✓ | ✓ | 100/100 |
| /colecciones | ✓ | - | - | ✓ | 90/100 |
| /empresa | ✓ | - | - | ✓ | 90/100 |

---

**Última actualización:** 2025-10-28

