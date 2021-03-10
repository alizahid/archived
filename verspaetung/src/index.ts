import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import { resolvers } from './resolvers'

const main = async (): Promise<void> => {
  const schema = await buildSchema({
    container: Container,
    dateScalarMode: 'isoDate',
    resolvers
  })

  const server = new ApolloServer({
    schema
  })

  await server.listen({
    port: 8081
  })
}

main()
