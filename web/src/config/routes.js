import { generatePath } from 'react-router'
import * as PAGES from 'pages'

// generatePath('/user/:id/:entity(posts|comments)', {
//   id: 1,
//   entity: 'posts',
// })

export const ROUTES = {
  HOME: {
    NAME: 'home',
    PATH: (params) => generatePath('/', params),
    COMPONENT: PAGES.HomePage,
  },
}
