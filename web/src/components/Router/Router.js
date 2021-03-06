import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ROUTES } from 'src/routes'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={ROUTES.HOME.PATH()}
        component={ROUTES.HOME.COMPONENT}
      />
      {/* PLOP - APPEND ROUTE HERE */}
      <Route
        path={ROUTES.NOT_FOUND.PATH}
        component={ROUTES.NOT_FOUND.COMPONENT}
      />
    </Switch>
  </BrowserRouter>
)
