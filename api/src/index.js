import { https } from 'firebase-functions'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'

const app = express()
const server = new ApolloServer({ schema, playground: true })
server.applyMiddleware({ app, path: '/', cors: true })
export const graphql = https.onRequest(app)
