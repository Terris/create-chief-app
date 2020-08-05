import React, { useEffect } from 'react'
import { firebase } from 'src/lib/firebase'
import { AuthReducer } from './AuthReducer'
import { useAlert } from 'src/context'

// SETUP
export const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
}
export const AuthContext = React.createContext(initialState)
export const useAuth = () => React.useContext(AuthContext)

// PROVIDER
export const AuthProvider = ({ children }) => {
  const { registerError } = useAlert()
  const [state, dispatch] = React.useReducer(AuthReducer, initialState)
  const auth = firebase.auth()

  // listen for auth state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setAuthUser(authUser)
    })
    return () => unsubscribe()
  }, [auth])

  // ACTIONS
  const setAuthUser = (authUser) => {
    dispatch({
      type: 'SET_AUTH_USER',
      payload: authUser,
    })
  }

  const signUp = async ({ email, password }) => {
    const user = await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => registerError(error))
    dispatch({
      type: 'SIGN_IN',
      payload: { user },
    })
  }

  const signIn = async ({ email, password }) => {
    const user = await auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => registerError(error))
    dispatch({
      type: 'SIGN_IN',
      payload: { user },
    })
  }

  const signOut = async () => {
    await auth.signOut()
    dispatch({
      type: 'SIGN_OUT',
    })
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
