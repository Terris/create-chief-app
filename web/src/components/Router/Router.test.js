import React from 'react'
import { render, screen } from '@testing-library/react'
import { Router } from './Router'

// React Router is extensively tested
// so it's probably okay to leave this as is.

test('renders without crashing', async () => {
  render(<Router />)
  expect(screen.getByText(/Home/i)).toBeInTheDocument()
})
