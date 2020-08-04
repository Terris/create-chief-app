import React from 'react'
import { firebase } from 'src/lib/firebase'
import { AuthReducer } from './AuthReducer'
import { useAlert } from 'src/context'

// SETUP
export const initialState = { currentUser: null }
export const AuthContext = React.createContext(initialState)
export const useAuth = () => React.useContext(AuthContext)

// PROVIDER
export const AuthProvider = ({ children }) => {
  const { registerError } = useAlert()
  const [state, dispatch] = React.useReducer(AuthReducer, initialState)

  // dispatch actions
  const signIn = async ({ email, password }) => {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => registerError())
    dispatch({
      type: 'LOGIN',
      payload: { user },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
