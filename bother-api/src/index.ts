import Photon from '@generated/photon'
import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'

import auth, { getUser } from './auth'
import resolvers from './resolvers'
import typeDefs from './schema'

!(async () => {
  const photon = new Photon()

  await photon.connect()

  const schema = applyMiddleware(
    makeExecutableSchema({
      resolvers,
      typeDefs
    }),
    auth
  )

  const server = new ApolloServer({
    schema,
    async context(context) {
      return {
        ...context,
        user: await getUser(context, photon),
        photon
      }
    }
  })

  const { url } = await server.listen()

  console.log(`🚀  Server ready at ${url}`)
})()
