import React from 'react'
import { render, screen } from '@testing-library/react'
import { Layout } from './Layout'

test('renders without crashing', () => {
  const TestChild = () => <h1>Test Child Component</h1>
  render(
    <Layout>
      <TestChild />
    </Layout>
  )
  expect(screen.queryByText(/Test Child Component/i)).toBeInTheDocument()
})
