const mockValidCreds = { email: 'foo@example.com', password: 'foobarbaz' }
export const firebase = {
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
}
