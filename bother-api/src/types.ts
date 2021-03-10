import Photon, { User } from '@generated/photon'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

export interface Context {
  context: ExpressContext
  photon: Photon
  user: User
}

export enum PostType {
  LATEST = 'LATEST',
  NEARBY = 'NEARBY',
  POPULAR = 'POPULAR'
}
