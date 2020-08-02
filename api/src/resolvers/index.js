import { users } from './users.js'

const cast = (val) => Object.keys(val).map((key) => val[key])

export const resolvers = {
  Query: {
    users: cast(users),
  },
}
