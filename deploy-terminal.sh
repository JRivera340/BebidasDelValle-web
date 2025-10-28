#!/bin/bash

# Script para desplegar Bebidas del Valle en Vercel

echo "🚀 Desplegando Bebidas del Valle a Vercel..."
echo ""

# Login en Vercel
echo "Paso 1: Login en Vercel"
vercel login

echo ""
echo "Paso 2: Desplegando a producción..."
vercel --prod

echo ""
echo "✅ ¡Deploy completado!"
echo "Copia el link de arriba y compártelo con tu cliente"

