# Características del Proyecto - Bebidas del Valle ALMA

## 🎯 Características Principales

### 1. Accordion Showroom (Componente Estrella)
Implementado en `components/AccordionShowroom.tsx` y visible en:
- Página principal: `/`
- Página de colecciones: `/colecciones`

**Comportamiento:**
- 3 paneles horizontales (Rojo Clásico, Dorado Premium, Blanco Esencial)
- Panel inactivo: 17.5% ancho, grayscale 90%
- Panel activo: 65% ancho, color completo
- Animación suave: 600ms cubic-bezier(0.4, 0, 0.2, 1)
- Soporte teclado: Enter/Space para expandir
- Hover parallax leve en imagen de fondo
- Indicador visual: punto dorado en panel activo

**Accesibilidad:**
- `aria-expanded` en cada panel
- `role="button"` para interacción
- `tabIndex={0}` para navegación con teclado
- Focus visible con ring dorado

### 2. Product Cards con Micro-interacciones
Implementado en `components/ProductCard.tsx`

**Efectos:**
- Hover tilt: `rotateZ(-0.4deg) translateY(-2px)`
- Image zoom: scale(1.1) en 500ms
- CTA "magnético": ícono WhatsApp se traslada 2px
- Stagger animation: delay de 0.1s por card
- Shadow elevation en hover

**Estados visuales:**
- Badge dorado con shimmer animation para ediciones especiales
- "No disponible" overlay cuando `available: false`
- Tags coloridos para categorías y características

### 3. Product Gallery con Zoom
Implementado en `components/ProductGallery.tsx`

**Features:**
- Imagen principal con zoom al hover (scale 1.5)
- Miniaturas navegables debajo
- Navegación con flechas (keyboard + click)
- Contador de imágenes: "2 / 4"
- Transiciones suaves entre imágenes
- Touch-friendly para móvil

### 4. Sistema de Filtros Inteligente
Implementado en `components/Filters.tsx` y usado en `/catalogo`

**Capacidades:**
- Búsqueda en tiempo real (nombre, descripción, tags)
- Filtro por categoría (Vinos / Harinas)
- Toggle "Solo disponibles"
- Contador de resultados
- Botón "Limpiar filtros"
- Estado persistente durante navegación

### 5. WhatsApp CTAs con UTM Tracking
Implementado en `lib/whatsapp.ts`

**3 tipos de mensajes:**

1. **Producto específico:**
```
Hola, me interesa {nombre} ({slug}). 
¿Disponibilidad y opciones de presentación?
utm_source=web&utm_medium=cta&utm_campaign=whatsapp_producto
```

2. **Cesta personalizada:**
```
Hola, me gustaría armar una cesta personalizada. 
¿Qué opciones tienen disponibles?
utm_source=web&utm_medium=cta&utm_campaign=whatsapp_cesta
```

3. **Pedido por volumen:**
```
Hola, necesito cotizar un pedido de {cantidad} unidades 
para envío a {ciudad}.
utm_source=web&utm_medium=cta&utm_campaign=whatsapp_volumen
```

### 6. SEO Técnico Completo
Implementado en `lib/seo.ts`

**Structured Data (JSON-LD):**
- **Product schema** en cada página de producto
- **BreadcrumbList** para navegación
- **Organization** en layout principal

**Meta tags:**
- Open Graph para redes sociales
- Twitter Cards
- `metadataBase` configurado
- Canonical URLs automáticos
- Robots meta por página

**Sitemap:**
- Generación automática con `next-sitemap`
- Post-build hook
- Todas las páginas estáticas indexadas
- `robots.txt` incluido

### 7. Analytics & Event Tracking
Implementado en `lib/analytics.ts`

**Eventos GA4:**
- `generate_lead` - Click en WhatsApp (con producto/slug)
- `view_item` - Vista de producto
- `begin_checkout` - Inicio de armado de cesta
- `select_content` - Interés en colección

**Parámetros personalizados:**
```typescript
{
  product_slug: string,
  product_name: string,
  category: string,
  source: string,
  method: 'whatsapp'
}
```

### 8. Responsive & Mobile-First

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Wide: > 1280px

**Mobile optimizations:**
- Burger menu en header
- AccordionShowroom adapta a vertical stack
- Product cards en grid de 1 columna
- Floating WhatsApp button en producto
- Touch-friendly targets (min 44px)

### 9. Performance Optimizations

**Images:**
- `next/image` con lazy loading automático
- Priority en hero image
- Sizes attribute optimizado
- Responsive srcset

**Code splitting:**
- Componentes client ('use client') separados
- Dynamic imports donde sea posible
- Shared chunks optimizados

**Static Generation:**
- ISR en páginas de producto
- SSG en categorías
- generateStaticParams para rutas dinámicas

**Build output:**
```
First Load JS: 87.1 kB
Productos: ~148 kB total
Catálogo: ~147 kB total
```

### 10. Accesibilidad (WCAG 2.1 AA)

**Implementado:**
- Contraste mínimo 4.5:1 (AA)
- Navegación por teclado completa
- Focus visible en todos los elementos interactivos
- ARIA labels y roles apropiados
- Skip links (puede añadirse)
- Screen reader friendly

**Tamaños táctiles:**
- Botones: min 44x44px
- Links: min 44x44px altura
- Form inputs: min 44px altura

### 11. Diseño de Marca Coherente

**Paleta de colores:**
```css
brand-red: #B11E2F (primario)
brand-red-hover: #9A1A29
brand-gold: #C8A349 (secundario)
brand-gold-hover: #B28F3F
brand-white: #FFFFFF
ink: #1F2937 (texto)
```

**Componentes de UI:**
- Botones con variantes `primary` y `gold`
- Cards con `rounded-2xl` y shadow custom
- Badges con shimmer dorado para premium
- Transitions de 300-600ms

**Typography:**
- Font: Inter (Variable)
- Escala: 0.875rem - 6rem
- Line-height: 1.2 - 1.75

### 12. Data Management

**Estructura de datos:**
```typescript
PRODUCTS: Product[] - 6 productos iniciales
COLLECTIONS: Collection[] - 3 colecciones temáticas
```

**Helpers:**
- `getProductBySlug(slug)` - Búsqueda por slug
- `getProductsByCategory(category)` - Filtro por categoría
- `searchProducts(query)` - Búsqueda full-text

## 🎨 Micro-interacciones Implementadas

### Shimmer Effect (Badges Dorados)
```css
.shimmer-gold {
  background: linear-gradient(90deg, #C8A349 0%, #E5C76A 50%, #C8A349 100%);
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}
```

### Magnetic Buttons
Ícono WhatsApp se traslada 2-3px en hover:
```tsx
className="transition-transform group-hover:translate-x-1"
```

### Stagger Animation
Cards aparecen secuencialmente:
```tsx
transition={{ duration: 0.4, delay: index * 0.1 }}
```

### Parallax en Accordion
Imagen de fondo con leve translateY en scroll (sutil)

## 📱 PWA-Ready (Opcional - No implementado)

Para convertir en PWA, agregar:
1. `next-pwa` package
2. `manifest.json` en `/public`
3. Service worker config
4. Icons en múltiples tamaños

## 🚀 Features No Implementadas (Futuras)

Posibles mejoras:
- [ ] Carrito de compras
- [ ] Sistema de usuarios/login
- [ ] Pagos online (Stripe/PayU)
- [ ] Blog de contenidos
- [ ] Newsletter subscription
- [ ] Wishlist / Favoritos
- [ ] Comparador de productos
- [ ] Chat en vivo
- [ ] Reviews/Ratings
- [ ] Multi-idioma (i18n)

## 🎯 Métricas de Éxito

**Performance targets:**
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1

**Business metrics:**
- Clicks en WhatsApp CTA
- Tiempo en página de producto
- Bounce rate < 40%
- Conversión página → WhatsApp > 5%

---

**Total:** 12 características principales, 4 micro-interacciones, SEO completo, Analytics configurado.

