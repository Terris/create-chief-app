import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import { AlertProvider } from '../AlertContext/AlertContext'

// SETUP
const mockValidCreds = { email: 'foo@example.com', password: 'foobarbaz' }
const mockInvalidCreds = { email: 'nope@example.com', password: 'bazbuckle' }
jest.mock('src/lib/firebase', () => {
  return {
    firebase: {
      auth: jest.fn(() => {
        const resolveOrReject = (email, password) => {
          return new Promise((resolve, reject) => {
            if (
              email === mockValidCreds.email &&
              password === mockValidCreds.password
            ) {
              resolve({ user: { email } })
            } else {
              reject(new Error('Incorrect credentials!'))
            }
          })
        }
        return {
          onAuthStateChanged: () => jest.fn(),
          createUserWithEmailAndPassword: (email, password) =>
            resolveOrReject(email, password),
          signInWithEmailAndPassword: (email, password) =>
            resolveOrReject(email, password),
          signOut: () => jest.fn(),
        }
      }),
    },
  }
})

test('it renders and gets/sets context as expected', async () => {
  const TestChildComponent = () => {
    const { currentUser, isAuthenticated, signUp, signOut, signIn } = useAuth()
    return (
      <>
        <h1>AuthProvider Context</h1>
        <p>{JSON.stringify(currentUser)}</p>
        <p>The user {isAuthenticated ? 'is' : "isn't"} authenticated.</p>
        {isAuthenticated ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <>
            <button onClick={() => signUp(mockValidCreds)}>Sign Up</button>
            <button onClick={() => signIn(mockValidCreds)}>Sign In</button>
            <button onClick={() => signIn(mockInvalidCreds)}>
              Invalid Creds
            </button>
          </>
        )}
      </>
    )
  }
  render(
    <AlertProvider>
      <AuthProvider>
        <TestChildComponent />
      </AuthProvider>
    </AlertProvider>
  )
  expect(screen.getByText(/AuthProvider Context/i)).toBeInTheDocument()
  // null by default
  expect(screen.getByText(/The user isn't authenticated./i)).toBeInTheDocument()
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
  // sign up
  fireEvent.click(screen.getByText(/Sign Up/i))
  await waitFor(() => {
    expect(screen.getByText(/The user is authenticated./i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument()
  })
  // sign out
  fireEvent.click(screen.getByText(/Sign Out/i))
  await waitFor(() => {
    expect(
      screen.getByText(/The user isn't authenticated./)
    ).toBeInTheDocument()
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
  })
  // sign in with wrong creds
  fireEvent.click(screen.getByText(/Invalid Creds/i))
  await waitFor(() => {
    expect(
      screen.getByText(/The user isn't authenticated./i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/Sign Out/i)).toBe(null)
  })
  // sign in
  fireEvent.click(screen.getByText(/Sign In/i))
  await waitFor(() => {
    expect(screen.getByText(/The user is authenticated./i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument()
  })
})
