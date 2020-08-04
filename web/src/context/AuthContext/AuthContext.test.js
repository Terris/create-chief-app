import React from 'react'
import { render, screen } from '@testing-library/react'
import { AuthProvider } from './AuthContext'

test('renders without crashing', () => {
  render(<AuthProvider />)
  expect(screen.getByText(/AuthProvider Component/i)).toBeInTheDocument()
})
