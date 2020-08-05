import React from 'react'
import { AlertReducer } from './AlertReducer'

// SETUP
export const initialState = { errors: null }
export const AlertContext = React.createContext(initialState)
export const useAlert = () => React.useContext(AlertContext)

// PROVIDER
export const AlertProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AlertReducer, initialState)

  // dispatch actions
  const registerError = async (error) => {
    dispatch({
      type: 'REGISTER_ERROR',
      payload: { error },
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        registerError,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}
