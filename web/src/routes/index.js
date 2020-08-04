import { generatePath } from 'react-router'
import * as PAGES from 'src/pages'

export const ROUTES = {
  HOME: {
    PATH: (params) => generatePath('/', params),
    COMPONENT: PAGES.HomePage,
  },
  NOT_FOUND: {
    PATH: '*',
    COMPONENT: PAGES.NotFoundPage,
  },
  // PLOP - APPEND ROUTE HERE
}
