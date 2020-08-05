import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form } from './Form'
import { Fieldset } from 'src/components'

const TestComponent = () => {
  const validSecret = 'foobarbaz'
  const [isCorrect, setIsCorrect] = React.useState(false)
  const [error, setError] = React.useState(null)
  const onSubmit = (data) => {
    setIsCorrect(false)
    setError(null)
    if (data.secretPasscode === validSecret) {
      setIsCorrect(true)
    } else {
      setError('You shall not pass!')
    }
  }

  return (
    <>
      {isCorrect && <p>You may enter.</p>}
      <Form onSubmit={onSubmit} error={error}>
        <Fieldset
          type="text"
          name="secretPasscode"
          label="Enter the Passcode"
          placeholder="Passcode"
        />
        <input type="submit" value="Submit" />
      </Form>
    </>
  )
}

test('renders and behaves as expected', async () => {
  render(<TestComponent />)
  // start: it should have the label, input and submit button
  const label = screen.getByText(/Enter the Passcode/i)
  const input = screen.getByPlaceholderText(/Passcode/i)
  const submit = screen.getByText(/Submit/i)
  expect(label).toBeInTheDocument()
  expect(input).toBeInTheDocument()
  expect(submit).toBeInTheDocument()
  // Submit with invalid value
  // should show an error
  fireEvent.change(input, {
    target: { value: 'Abracadabra!' },
  })
  expect(input.value).toBe('Abracadabra!')
  fireEvent.click(submit)
  await waitFor(() => {
    expect(screen.getByText(/You shall not pass!/i)).toBeInTheDocument()
    expect(screen.queryByText(/You may enter./i)).toBe(null)
  })
  // submit with valid value
  // should show form data
  fireEvent.change(input, {
    target: { value: 'foobarbaz' },
  })
  expect(input.value).toBe('foobarbaz')
  fireEvent.click(submit)
  await waitFor(() => {
    expect(screen.getByText(/You may enter./i)).toBeInTheDocument()
    expect(screen.queryByText(/You shall not pass!/i)).toBe(null)
  })
})
