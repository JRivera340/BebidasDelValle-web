'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { MessageCircle, Package, Users, Award, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { waVolumeMessage } from '@/lib/whatsapp'

export default function EmpresaPage() {
  const [quantity, setQuantity] = useState('')
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (quantity && city) {
      window.open(waVolumeMessage(quantity, city), '_blank')
    }
  }

  const volumeTiers = [
    { min: 10, max: 49, discount: '5%', delivery: '3-5 días' },
    { min: 50, max: 99, discount: '10%', delivery: '5-7 días' },
    { min: 100, max: 199, discount: '15%', delivery: '7-10 días' },
    { min: 200, max: null, discount: '20%+', delivery: 'Personalizado' },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-red via-brand-red-hover to-brand-gold text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Soluciones Corporativas</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Pedidos corporativos y regalos empresariales
            </h1>
            <p className="text-xl text-white/90">
              Cestas personalizadas para empresas, eventos corporativos y obsequios de temporada.
              Atención especializada y descuentos por volumen.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10">
                <Package className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold">Personalización total</h3>
              <p className="text-gray-600">Adaptamos cada cesta a tu marca y necesidades</p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10">
                <Users className="h-8 w-8 text-brand-gold" />
              </div>
              <h3 className="text-xl font-semibold">Atención dedicada</h3>
              <p className="text-gray-600">Gestor de cuenta exclusivo para tu empresa</p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10">
                <Award className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold">Calidad garantizada</h3>
              <p className="text-gray-600">Productos premium seleccionados cuidadosamente</p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10">
                <MessageCircle className="h-8 w-8 text-brand-gold" />
              </div>
              <h3 className="text-xl font-semibold">Proceso ágil</h3>
              <p className="text-gray-600">Cotización y confirmación en 24 horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-3">Descuentos por volumen</h2>
            <p className="text-center text-gray-600 mb-12">
              A mayor cantidad, mejores beneficios para tu empresa
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-card overflow-hidden">
                <thead className="bg-brand-red text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Unidades</th>
                    <th className="px-6 py-4 text-left font-semibold">Descuento</th>
                    <th className="px-6 py-4 text-left font-semibold">Tiempo de entrega</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {volumeTiers.map((tier, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">
                        {tier.min} - {tier.max || '∞'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold font-semibold">
                          {tier.discount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{tier.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              * Descuentos aplicables sobre precio de lista. Consulta condiciones especiales para
              pedidos recurrentes.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-brand-red to-brand-gold p-8 md:p-12 rounded-2xl text-white space-y-6">
              <h2 className="text-3xl font-bold">Solicita tu cotización</h2>
              <p className="text-white/90">
                Completa la información y te contactaremos por WhatsApp para brindarte una
                propuesta personalizada.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-white">
                    Cantidad aproximada de unidades
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="10"
                    placeholder="Ej: 50"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    Ciudad de entrega
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Ej: Bogotá"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-white text-brand-red hover:bg-gray-100 group mt-6"
                >
                  <MessageCircle className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" />
                  Solicitar cotización por WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Preguntas frecuentes</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  ¿Puedo personalizar las cestas con el logo de mi empresa?
                </h3>
                <p className="text-gray-600">
                  Sí, ofrecemos opciones de personalización que incluyen tarjetas con mensaje,
                  logo de tu empresa en el empaque, y selección específica de productos según tus
                  necesidades.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">
                  ¿Cuál es el pedido mínimo para empresas?
                </h3>
                <p className="text-gray-600">
                  El pedido mínimo es de 10 unidades para acceder a descuentos corporativos. Para
                  cantidades menores, puedes consultar nuestro catálogo regular.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">¿Hacen entregas a nivel nacional?</h3>
                <p className="text-gray-600">
                  Sí, realizamos envíos a todas las principales ciudades de Colombia. Los tiempos
                  de entrega varían según la ubicación y la cantidad del pedido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

