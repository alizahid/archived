import { User } from '../models'

// posts

export type GetAllPostsRequestQuery = {
  limit?: number
  offset?: number
}

export type GetPostRequestParams = {
  id: string
}

export type CreatePostRequestHeaders = {
  'x-token': string
}

export type CreatePostRequestBody = {
  body: string
  title: string
}

// users

export type SignUpRequestBody = {
  password: string
  username: string
}

export type SignInRequestBody = {
  password: string
  username: string
}

// auth

export type AuthResult = {
  token: string
  user: User
}
