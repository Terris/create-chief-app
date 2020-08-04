import React from 'react'
import { render, screen } from '@testing-library/react'
import { Router } from './Router'

test('renders without crashing', () => {
  render(<Router />)
  expect(screen.getByText(/Home/i)).toBeInTheDocument()
})
