# 🔧 Fix Rápido para Deploy en Vercel

## Si estás viendo 404: NOT_FOUND

### Causa más común:
El deployment anterior falló por las imágenes de Unsplash que daban 404.

### Solución en 3 pasos:

## 1️⃣ Verifica el Estado en Vercel

**Abre:** https://vercel.com/dashboard

**Busca:** BebidasDelValle-web

**Revisa el último deployment:**
- Si dice "Failed" o "Error" → Continúa al paso 2
- Si dice "Building" → Espera 2 minutos y refresca
- Si dice "Ready" → Ve directamente al paso 3

---

## 2️⃣ Redeploy Forzado

### Método A: Desde Dashboard (Recomendado)

1. Click en tu proyecto "BebidasDelValle-web"
2. Tab "Deployments"
3. Click en el deployment más reciente
4. Botón "Redeploy" (arriba a la derecha)
5. Confirmar "Redeploy"
6. Esperar 2-3 minutos

### Método B: Desde Terminal

```bash
git commit --allow-empty -m "chore: force redeploy"
git push origin main
```

Espera 2-3 minutos y Vercel redesployará automáticamente.

---

## 3️⃣ Prueba tu Sitio

Una vez que Vercel diga "Ready":

1. Copia la URL de Production (ej: `https://bebidas-del-valle-web.vercel.app`)
2. Ábrela en una **ventana de incógnito** (Ctrl + Shift + N)
3. Si no carga, haz **Ctrl + Shift + R** (hard refresh)

---

## 🎯 URLs Posibles

Tu sitio puede estar en una de estas URLs:

```
https://bebidas-del-valle-web.vercel.app
https://bebidas-del-valle-web-jrivera340.vercel.app
https://bebidas-del-valle-web-git-main-jrivera340.vercel.app
```

**Prueba la URL que te dio Vercel en el dashboard.**

---

## ❌ Si TODAVÍA da Error 404

### Opción 1: Reimport el Proyecto

1. Ve a https://vercel.com/new
2. "Import Git Repository"
3. Busca "BebidasDelValle-web"
4. Si no aparece:
   - "Adjust GitHub App Permissions"
   - Autoriza el repositorio
   - Vuelve a importar

### Opción 2: Verifica los Logs

1. Dashboard → Tu proyecto
2. Click en el último deployment
3. Tab "Logs" o "Build Logs"
4. Busca mensajes de error en rojo
5. Comparte el error conmigo

---

## ✅ Checklist de Verificación

Antes de declarar que funciona:

- [ ] Vercel dice "Ready" (no "Building" ni "Failed")
- [ ] URL abre en navegador (no 404)
- [ ] Logo dice "Bebidas del Valle"
- [ ] Imágenes cargan (SVG con colores)
- [ ] Navegación funciona (Home, Catálogo, etc.)
- [ ] No hay errores en consola del navegador (F12)

---

## 🆘 Última Opción: Captura de Pantalla

Si nada funciona, toma capturas de:

1. Dashboard de Vercel (estado del deployment)
2. La pantalla de error 404 que ves
3. Build Logs (si hay errores en rojo)

Y compártelas para ayudarte mejor.

---

**Última actualización:** 28 octubre 2025

