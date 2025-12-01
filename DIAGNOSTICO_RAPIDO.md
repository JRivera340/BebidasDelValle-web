# 🔧 Diagnóstico Rápido - Problema de Carga

## Pasos para Diagnosticar:

1. **Verifica que no haya procesos bloqueados:**
   ```powershell
   taskkill /F /IM node.exe
   ```

2. **Limpia TODO:**
   ```powershell
   rmdir /s /q .next
   rmdir /s /q node_modules
   ```

3. **Reinstala dependencias:**
   ```powershell
   npm install
   ```

4. **Inicia el servidor:**
   ```powershell
   npm run dev
   ```

5. **Espera 30 segundos y mira la terminal:**
   - Si ves "✓ Ready" → El problema es en el navegador
   - Si ves errores en rojo → Copia el error completo
   - Si se queda en "Starting..." → Hay un loop infinito

## Si sigue sin funcionar:

Abre la terminal y ejecuta esto para ver errores:
```powershell
npm run dev 2>&1 | Tee-Object -FilePath error.log
```

Luego revisa el archivo error.log

