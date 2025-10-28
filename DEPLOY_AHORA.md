# 🚀 Desplegar en Vercel AHORA - Guía Rápida

## ✅ Ya completado
- [x] Código en GitHub: https://github.com/JRivera340/BebidasDelValle-web

---

## Opción 1: Deploy desde la Web (MÁS FÁCIL) ⭐

### Paso 1: Entra a Vercel
1. Ve a https://vercel.com
2. Haz clic en **"Sign In"** o **"Sign Up"**
3. Usa **"Continue with GitHub"** (recomendado)

### Paso 2: Importa tu proyecto
1. Haz clic en **"Add New"** → **"Project"**
2. En la lista de repositorios, busca: **BebidasDelValle-web**
3. Haz clic en **"Import"**

### Paso 3: Configuración (mantén todo por defecto)
```
Framework Preset: Next.js ✓ (detectado automáticamente)
Root Directory: ./ (dejar por defecto)
Build Command: next build ✓ (automático)
Output Directory: .next ✓ (automático)
Install Command: npm install ✓ (automático)
```

**Variables de entorno (OPCIONAL por ahora):**
- Puedes dejarlo vacío y agregarlo después
- O agregar ahora:
  ```
  NEXT_PUBLIC_SITE_URL = https://tu-proyecto.vercel.app
  ```

### Paso 4: Deploy
1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos ⏳
3. ¡Listo! Tu sitio estará en: `https://bebidas-del-valle-web.vercel.app`

---

## Opción 2: Deploy desde la Terminal (MÁS RÁPIDO)

### Instalar Vercel CLI (solo la primera vez)
```bash
npm i -g vercel
```

### Login en Vercel
```bash
vercel login
```
Sigue las instrucciones en el navegador.

### Deploy
```bash
vercel
```

**Responde a las preguntas:**
```
? Set up and deploy "~/BebidasDelValle-web"? [Y/n] → Y
? Which scope do you want to deploy to? → Elige tu cuenta
? Link to existing project? [y/N] → N
? What's your project's name? → bebidas-del-valle-web
? In which directory is your code located? → ./ (Enter)
```

Espera unos segundos y tendrás:
- Preview URL: `https://bebidas-del-valle-web-xxx.vercel.app`

### Deploy a producción
```bash
vercel --prod
```

---

## 📊 Después del Deploy

### 1. Obtendrás 2 URLs:
- **Preview:** `https://bebidas-del-valle-web-xxx.vercel.app` (para pruebas)
- **Production:** `https://bebidas-del-valle-web.vercel.app` (para tu cliente)

### 2. Actualizar variables de entorno
Ve a: **Project Settings** → **Environment Variables**
```
NEXT_PUBLIC_SITE_URL = https://bebidas-del-valle-web.vercel.app
```
Luego redeploy automáticamente.

### 3. Dominio personalizado (opcional)
Si tienes un dominio tipo `bebidasdelvalle.com`:
1. Ve a **Project Settings** → **Domains**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio
4. Sigue las instrucciones de DNS

---

## ✅ Verificaciones Post-Deploy

Visita tu sitio y verifica:
- [ ] Logo dice "Bebidas del Valle"
- [ ] Imágenes cargan correctamente
- [ ] Navegación funciona (Home, Catálogo, Colecciones, Empresa)
- [ ] AccordionShowroom anima correctamente
- [ ] Links de WhatsApp funcionan (abre WhatsApp)
- [ ] Filtros en catálogo funcionan
- [ ] Páginas de producto se ven bien

---

## 🔄 Futuros Cambios

Cada vez que hagas `git push origin main`, Vercel desplegará automáticamente.

**Workflow:**
```bash
# 1. Hacer cambios locales
npm run dev  # Probar localmente

# 2. Commit y push
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# 3. Vercel despliega automáticamente ✨
```

---

## 🆘 Problemas Comunes

### Build falla
```bash
# Probar build local primero
npm run build
```
Si falla localmente, arregla los errores antes de push.

### Imágenes no cargan
- Verifica que las URLs de Unsplash sean correctas
- O reemplaza con imágenes locales en `public/img/`

### Variables de entorno no funcionan
- Recuerda agregar `NEXT_PUBLIC_` al inicio
- Redeploy después de agregar variables

---

## 📱 Comparte con tu Cliente

Envíale estos links:
```
🌐 Sitio Web: https://bebidas-del-valle-web.vercel.app
📱 Móvil: (mismo link, responsive)
```

**Mensaje sugerido:**
```
Hola! Ya está lista la primera versión del catálogo web de Bebidas del Valle.

Puedes verlo aquí: https://bebidas-del-valle-web.vercel.app

Características implementadas:
✅ Catálogo de 6 productos (3 vinos + 3 harinas)
✅ Showroom dinámico de colecciones
✅ Filtros de búsqueda
✅ Integración directa con WhatsApp
✅ Diseño responsive (móvil + escritorio)
✅ Sección de pedidos corporativos

Las imágenes actuales son placeholders profesionales. 
Cuando tengas las fotos reales de los productos, las reemplazamos.

¿Qué te parece? ¿Algún ajuste que quieras hacer?
```

---

**Deploy realizado:** 28 octubre 2025
**Repositorio:** https://github.com/JRivera340/BebidasDelValle-web

