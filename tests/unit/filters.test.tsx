import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filters } from '@/components/Filters'

describe('Filters', () => {
  it('llama al callback al elegir categoría', async () => {
    const onCategoryChange = vi.fn()
    render(
      <Filters
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="all"
        onCategoryChange={onCategoryChange}
        showAvailableOnly={false}
        onAvailableToggle={() => {}}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: 'Harinas' }))
    expect(onCategoryChange).toHaveBeenCalledWith('harinas')
  })
})
