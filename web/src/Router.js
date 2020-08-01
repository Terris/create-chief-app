import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ROUTES } from './config'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={ROUTES.HOME.PATH()}
        component={ROUTES.HOME.COMPONENT}
      />
      {/* PLOP - APPEND ROUTE HERE */}
    </Switch>
  </BrowserRouter>
)
