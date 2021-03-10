import { Resolvers, gql } from 'apollo-boost'

import { storage } from '../lib'

export const defaults = {}

export const resolvers: Resolvers = {
  Query: {
    token() {
      return storage.getItem('token')
    }
  },
  Mutation: {
    setAuth(parent, { token }) {
      return storage.setItem('token', token)
    }
  }
}

export const typeDefs = `
  type Query {
    token: String
  }
`
