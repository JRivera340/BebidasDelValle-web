import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filters } from '@/components/product/Filters'
import { SellosAdvertencia } from '@/components/product/SellosAdvertencia'
import { ProductCard } from '@/components/product/ProductCard'
import { CotizacionForm } from '@/components/sections/CotizacionForm'
import { PRODUCTOS } from '@/lib/data/products'

describe('Filters', () => {
  it('genera las categorías desde los datos y llama al callback', async () => {
    const onCategoryChange = vi.fn()
    render(
      <Filters
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="todas"
        onCategoryChange={onCategoryChange}
        showAvailableOnly={false}
        onAvailableToggle={() => {}}
      />
    )
    for (const nombre of ['Todas', 'Bebidas', 'Harinas', 'Panadería']) {
      expect(screen.getByRole('button', { name: nombre })).toBeInTheDocument()
    }
    await userEvent.click(screen.getByRole('button', { name: 'Harinas' }))
    expect(onCategoryChange).toHaveBeenCalledWith('harinas')
  })
})

describe('SellosAdvertencia', () => {
  it('muestra un sello por cada valor', () => {
    render(<SellosAdvertencia sellos={['azucares', 'sodio', 'edulcorantes']} />)
    expect(screen.getAllByTestId('sello')).toHaveLength(3)
    expect(screen.getByRole('img', { name: /azúcares/i })).toBeInTheDocument()
  })
})

describe('ProductCard', () => {
  it('enlaza a la ficha, muestra sellos y CTA de WhatsApp con ref', () => {
    const producto = PRODUCTOS[0]
    render(<ProductCard producto={producto} />)
    const ficha = screen.getAllByRole('link').find((a) => a.getAttribute('href') === `/producto/${producto.slug}`)
    expect(ficha).toBeDefined()
    expect(screen.getAllByTestId('sello').length).toBe(producto.sellos.length)
    const wa = screen.getByRole('link', { name: /Consultar/ })
    expect(decodeURIComponent(wa.getAttribute('href') ?? '')).toContain(`ref=tarjeta-${producto.slug}`)
  })
})

describe('CotizacionForm', () => {
  it('rechaza menos de 10 unidades y ciudad vacía', async () => {
    const abrir = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<CotizacionForm />)
    await userEvent.type(screen.getByLabelText(/Cantidad aproximada/), '5')
    await userEvent.click(screen.getByRole('button', { name: /Solicitar cotización/ }))
    expect(screen.getAllByRole('alert').length).toBe(2)
    expect(abrir).not.toHaveBeenCalled()
  })

  it('abre WhatsApp con datos válidos', async () => {
    const abrir = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<CotizacionForm />)
    await userEvent.type(screen.getByLabelText(/Cantidad aproximada/), '50')
    await userEvent.type(screen.getByLabelText(/Ciudad de entrega/), 'Cali')
    await userEvent.click(screen.getByRole('button', { name: /Solicitar cotización/ }))
    expect(abrir).toHaveBeenCalledTimes(1)
    expect(decodeURIComponent(String(abrir.mock.calls[0][0]))).toContain('50 unidades')
  })
})
