import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form } from 'src/components'
import { Fieldset } from './Fieldset'

const TestComponent = () => {
  const [formData, setFormData] = React.useState(null)
  const onSubmit = (data) => {
    setFormData(data)
  }
  return (
    <Form onSubmit={onSubmit}>
      {formData && <p>{JSON.stringify(formData)}</p>}
      <Fieldset
        name="test"
        label="Label for Test"
        placeholder="Test Placeholder"
        defaultValue="Test Default Value"
        validation={{
          required: 'Test is required.',
        }}
      />
      <input type="submit" value="Submit" />
    </Form>
  )
}

test('it renders and behaves as expected', async () => {
  render(<TestComponent />)
  const input = screen.getByPlaceholderText(/Test Placeholder/i)
  // start: has placeholder and default value
  expect(input).toBeInTheDocument()
  expect(input.value).toBe('Test Default Value')
  // can change the value
  fireEvent.input(input, {
    target: { value: 'foobarbaz' },
  })
  expect(input.value).toBe('foobarbaz')
  // submit with valid input
  fireEvent.click(screen.getByText(/Submit/i))
  await waitFor(() => {
    expect(screen.getByText(/{"test":"foobarbaz"}/i)).toBeInTheDocument()
  })
  // submit with invalid input
  fireEvent.input(input, {
    target: { value: '' },
  })
  fireEvent.click(screen.getByText(/Submit/i))
  await waitFor(() => {
    screen.debug()
    expect(screen.getByText(/Test is required./i)).toBeInTheDocument()
  })
})
