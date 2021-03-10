import * as mutation from './mutation'
import * as query from './query'
import * as state from './state'

export { mutation, query, state }

export interface IUser {
  id: string
}

export interface IPost {
  id: string
  body: string
  comments: IComment[]
  created: any
  location: string
  rated: boolean
  rating: number
  user: IUser
}

export interface IRating {
  id: string
  created: any
  direction: number
  post: IPost
  updated: any
  user: IUser
}

export interface IComment {
  id: string
  body: string
  created: any
  post: IPost
  user: IUser
}

export interface IConversation {
  id: string
  created: any
  last: IMessage
  messages: IMessage[]
  updated: any
  users: IUser[]
}

export interface IMessage {
  id: string
  body: string
  created: any
  user: IUser
}
