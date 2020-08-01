import React from 'react'
import { render, screen } from '@testing-library/react'
import { NotFoundPage } from './NotFoundPage'

test('renders without crashing', () => {
  render(<NotFoundPage />)
  expect(screen.getByText('Not Found')).toBeInTheDocument()
})
