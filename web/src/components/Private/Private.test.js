import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from 'src/context'
import { Private } from './Private'

// SETUP
const mockValidCreds = { email: 'foo@example.com', password: 'foobarbaz' }
jest.mock('src/lib/firebase')

const Nav = () => {
  const { isAuthenticated, signIn, signOut } = useAuth()
  return (
    <nav>
      <Link to="/private">Private Link</Link>
      {isAuthenticated ? (
        <button onClick={() => signOut()}>Sign Out Button</button>
      ) : (
        <button onClick={() => signIn(mockValidCreds)}>Sign In Button</button>
      )}
    </nav>
  )
}
const HomePage = () => <h1>Home Page</h1>
const SignInPage = () => {
  return (
    <>
      <h1>Sign In Page</h1>
    </>
  )
}
const PrivatePage = () => <h1>Private Page</h1>

test('renders and redirects unauthenticated users', async () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <>
          <Nav />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/signin">
              <SignInPage />
            </Route>
            <Route path="/private">
              <Private redirectTo="/signin">
                <PrivatePage />
              </Private>
            </Route>
          </Switch>
        </>
      </MemoryRouter>
    </AuthProvider>
  )
  // start on home page
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
  expect(screen.queryByText(/Sign In Page/i)).toBe(null)
  expect(screen.queryByText(/Private Page/i)).toBe(null)
  // attempt to access private route
  // expect to get redirected to signin page
  fireEvent.click(screen.getByText(/Private Link/i))
  await waitFor(() => {
    expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument()
    expect(screen.queryByText(/Private Page/i)).toBe(null)
    expect(screen.queryByText(/Home Page/i)).toBe(null)
  })
  // mock sign in
  fireEvent.click(screen.getByText(/Sign In Button/i))
  await waitFor(() => {
    expect(screen.getByText(/Sign Out Button/i)).toBeInTheDocument()
  })
  // attempt to access private route
  // expect to have access
  fireEvent.click(screen.getByText(/Private Link/i))
  await waitFor(() => {
    expect(screen.getByText(/Private Page/i)).toBeInTheDocument()
    expect(screen.queryByText(/Home Page/i)).toBe(null)
    expect(screen.queryByText(/Sign In Page/i)).toBe(null)
  })
  // log out
  // and expect to be redirected to sign in page
  fireEvent.click(screen.getByText(/Sign Out Button/i))
  await waitFor(() => {
    expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument()
    expect(screen.queryByText(/Home Page/i)).toBe(null)
    expect(screen.queryByText(/Private Page/i)).toBe(null)
  })
})
