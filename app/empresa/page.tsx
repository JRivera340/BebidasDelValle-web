import type { Metadata } from 'next'
import { Building2, MessageCircle, Package, Users } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { EncabezadoPagina } from '@/components/layout/EncabezadoPagina'
import { CotizacionForm } from '@/components/sections/CotizacionForm'

export const metadata: Metadata = {
  title: 'Pedidos corporativos',
  description: 'Cestas personalizadas y regalos corporativos. Cuéntanos la cantidad y la ciudad y te respondemos por WhatsApp.',
  alternates: { canonical: '/empresa' },
}

// TODO(D4): descuentos por volumen, tiempos de entrega y gestor de cuenta quedan fuera hasta confirmar

const pasos = [
  { icono: Building2, titulo: 'Cuéntanos tu pedido', texto: 'Indica la cantidad aproximada y la ciudad de entrega.' },
  { icono: MessageCircle, titulo: 'Te escribimos', texto: 'Continuamos la conversación por WhatsApp.' },
  { icono: Package, titulo: 'Armamos la propuesta', texto: 'Definimos juntos los productos de la cesta.' },
]

const preguntas = [
  {
    pregunta: '¿Puedo elegir qué productos lleva la cesta?',
    respuesta: 'Sí. Cuéntanos qué te interesa y armamos la propuesta por WhatsApp.',
  },
  {
    pregunta: '¿Desde cuántas unidades puedo cotizar?',
    respuesta: 'El formulario recibe pedidos desde 10 unidades. Para cantidades menores, escríbenos y lo revisamos.',
  },
]

export default function EmpresaPage() {
  return (
    <>
      <EncabezadoPagina
        eyebrow="Soluciones corporativas"
        titulo="Pedidos corporativos y regalos empresariales"
        descripcion="Cestas personalizadas para empresas, eventos y obsequios de temporada."
      />

      <Section id="proceso" titulo="Cómo funciona">
        <ol className="grid gap-8 sm:grid-cols-3">
          {pasos.map(({ icono: Icono, titulo, texto }, i) => (
            <li key={titulo} className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10">
                <Icono className="h-8 w-8 text-brand-gold" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl">
                {i + 1}. {titulo}
              </h3>
              <p className="max-w-xs text-suave">{texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="cotizacion"
        titulo="Solicita tu cotización"
        descripcion="Completa los datos y continúa por WhatsApp."
        superficie
      >
        <CotizacionForm />
      </Section>

      <Section id="preguntas" titulo="Preguntas frecuentes">
        <dl className="mx-auto max-w-prose space-y-4 text-center">
          {preguntas.map((p) => (
            <div key={p.pregunta} className="rounded-lg border border-border bg-superficie p-6">
              <dt className="font-display text-lg">{p.pregunta}</dt>
              <dd className="mt-2 text-suave">{p.respuesta}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
