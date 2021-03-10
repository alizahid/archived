import ApolloClient, {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-boost'
import { API_URI } from 'react-native-dotenv'

import { storage } from '../lib'
import schema from './schema.json'

export const client = new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: schema
    })
  }),
  async request(operation) {
    const token = await storage.get('@token')

    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  },
  uri: API_URI
})
