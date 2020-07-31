import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ROUTES } from 'src/config'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path={ROUTES.HOME.PATH} component={ROUTES.HOME.COMPONENT} />
    </Switch>
  </BrowserRouter>
)
