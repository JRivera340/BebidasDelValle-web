# 🚀 Deploy en Vercel - 5 Minutos

## ✅ Tu código ya está en GitHub
**Repositorio:** https://github.com/JRivera340/BebidasDelValle-web

---

## 📺 Pasos Visuales (SUPER FÁCIL)

### 1️⃣ Entra a Vercel
🔗 https://vercel.com/login

**Opciones de login:**
- GitHub (RECOMENDADO) ⭐
- GitLab
- Bitbucket
- Email

**Selecciona:** "Continue with GitHub"

---

### 2️⃣ Autoriza Vercel
Si es tu primera vez:
1. GitHub te pedirá autorizar Vercel
2. Haz clic en **"Authorize Vercel"**
3. Confirma tu contraseña si te la pide

---

### 3️⃣ Crea un nuevo proyecto
Una vez dentro de Vercel:

1. Haz clic en **"Add New..."** (botón arriba a la derecha)
2. Selecciona **"Project"**

---

### 4️⃣ Importa tu repositorio
Verás una lista de tus repositorios de GitHub:

```
🔍 Busca: BebidasDelValle-web
```

Si no lo ves, haz clic en **"Adjust GitHub App Permissions"** y selecciona el repo.

Una vez que lo veas, haz clic en **"Import"** → ➡️

---

### 5️⃣ Configuración del proyecto
Vercel detectará automáticamente que es Next.js:

```
✅ Framework Preset: Next.js
✅ Root Directory: ./
✅ Build Command: next build
✅ Output Directory: .next
✅ Install Command: npm install
```

**¡NO CAMBIES NADA!** Todo está correcto.

**Environment Variables (opcional por ahora):**
Puedes dejarlo vacío o agregar:
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://bebidas-del-valle-web.vercel.app
```

---

### 6️⃣ Deploy! 🚀
1. Haz clic en el botón azul **"Deploy"**
2. Verás una animación de progreso
3. Espera 2-3 minutos ⏳

**Verás:**
```
🔨 Building...
✓ Build completed
🚀 Deploying...
✓ Deployment complete
```

---

### 7️⃣ ¡LISTO! 🎉
Verás una pantalla de éxito con confeti 🎊

**Tu sitio estará en:**
```
https://bebidas-del-valle-web.vercel.app
```

O algo similar como:
```
https://bebidas-del-valle-web-jrivera340.vercel.app
```

---

## 📱 Comparte con tu Cliente

Copia el link que te dio Vercel y envíaselo a tu cliente:

**Mensaje sugerido:**
```
¡Hola! Ya está lista la primera versión del catálogo web 🎉

🌐 Puedes verlo aquí: [TU-URL-DE-VERCEL]

Características:
✅ Catálogo completo de productos
✅ Showroom dinámico de colecciones
✅ Integración directa con WhatsApp
✅ Diseño profesional y responsive
✅ Sección de pedidos corporativos

Las imágenes actuales son placeholders profesionales.
Cuando tengas las fotos reales de los productos, las actualizamos.

¿Qué te parece? 😊
```

---

## 🔄 Futuros Cambios

Cada vez que hagas `git push`, Vercel desplegará automáticamente:

```bash
# Hacer cambios
code .

# Probar localmente
npm run dev

# Commit y push
git add .
git commit -m "feat: nuevo cambio"
git push origin main

# ✨ Vercel despliega automáticamente en ~2 min
```

---

## ⚙️ Configuración Adicional (Después)

### Dominio Personalizado
Si tienes `bebidasdelvalle.com`:
1. Ve a tu proyecto en Vercel
2. **Settings** → **Domains**
3. **Add Domain**
4. Sigue las instrucciones de DNS

### Analytics
Vercel incluye analytics gratis:
1. Ve a **Analytics** tab
2. Verás visitantes, páginas, etc.

### Variables de Entorno
Si necesitas agregar o cambiar:
1. **Settings** → **Environment Variables**
2. Agrega nuevas variables
3. Redeploy automáticamente

---

## 📊 Preview del Dashboard de Vercel

Después del deploy verás:

```
┌─────────────────────────────────┐
│  Bebidas del Valle             │
│  ✓ Production Deployment        │
│  ✓ Ready                        │
│                                 │
│  Visit: [tu-url]                │
│                                 │
│  Deployments  Domains  Settings │
└─────────────────────────────────┘
```

---

## ✅ Checklist Post-Deploy

Visita tu sitio y verifica:
- [ ] Se ve el logo "Bebidas del Valle"
- [ ] Las imágenes cargan
- [ ] Click en "Catálogo" funciona
- [ ] Filtros de búsqueda funcionan
- [ ] Click en un producto muestra detalles
- [ ] Botones de WhatsApp abren WhatsApp
- [ ] Se ve bien en móvil (prueba desde tu celular)

---

## 🎯 Tu Sitio Web Está Listo!

**¿Qué sigue?**
1. ✅ Comparte el link con tu cliente
2. ✅ Recibe feedback
3. ✅ Haz ajustes (cambios de texto, colores, etc.)
4. ✅ Git push → Se despliega automáticamente
5. ✅ Cuando tengas fotos reales, las reemplazas

---

**¿Necesitas ayuda?** 
Abre el archivo `CAMBIAR_IMAGENES.md` para cuando tengas las fotos reales.

---

**Deploy date:** 28 octubre 2025

