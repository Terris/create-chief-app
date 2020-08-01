import React from 'react'
import { render, screen } from '@testing-library/react'
import { HomePage } from './HomePage'

test('renders without crashing', () => {
  render(<HomePage />)
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
})
