import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'src/context'

export const Private = ({ children, redirectTo = '/' }) => {
  let history = useHistory()
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (!isAuthenticated) {
      history.push(redirectTo)
    }
  }, [isAuthenticated, history, redirectTo])
  return <>{children}</>
}
