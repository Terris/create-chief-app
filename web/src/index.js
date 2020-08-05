import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider, AlertProvider } from 'src/context'
import { ErrorBoundary, Router } from 'src/components'
import { apolloClient } from 'src/lib/apollo'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AlertProvider>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ApolloProvider>
      </AlertProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
