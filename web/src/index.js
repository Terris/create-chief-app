import React from 'react'
import ReactDOM from 'react-dom'
import { ChiefProvider } from 'chief-web'
import { Router } from 'src/Router'
import { apolloClient } from 'src/lib/apollo'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ChiefProvider apolloClient={apolloClient}>
      <Router />
    </ChiefProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
