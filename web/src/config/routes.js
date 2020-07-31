import { generatePath } from 'react-router'
import * as PAGES from 'src/pages'
// generatePath('/user/:id/:entity(posts|comments)', {
//   id: 1,
//   entity: 'posts',
// })

export const ROUTES = {
  HOME: {
    NAME: 'home',
    PATH: '/home',
    ROUTE: (params) => generatePath(this.PATH, params),
    COMPONENT: PAGES.HomePage,
  },
}
