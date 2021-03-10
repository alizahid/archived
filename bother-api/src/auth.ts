const { TOKEN_SECRET } = process.env

import Photon, { User } from '@generated/photon'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { rule, shield } from 'graphql-shield'
import { sign, verify } from 'jsonwebtoken'
import { get } from 'lodash'

import { Context } from './types'

export const getUser = async ({ req }: ExpressContext, photon: Photon) => {
  const auth = req.get('authorization')

  if (!auth) {
    return null
  }

  const token = auth.substr(7)

  if (!token) {
    throw new Error('Invalid auth token')
  }

  const data = await verify(token, TOKEN_SECRET as string)

  const id = get(data, 'userId')

  if (!id) {
    throw new Error('Invalid auth token')
  }

  const user = await photon.users.findOne({
    where: {
      id
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

export const createToken = (user: User) =>
  sign(
    {
      userId: user.id
    },
    TOKEN_SECRET as string
  )

const isAuthenticated = rule()(
  (parent, args, { user }: Context) => user !== null
)

const isPostOwner = rule()(
  async (parent, { id }, { photon, user }: Context) => {
    const post = await photon.posts.findOne({
      include: {
        user: true
      },
      where: {
        id
      }
    })

    if (!post) {
      return true
    }

    return post.user.id === user.id
  }
)

const isCommentOwner = rule()(
  async (parent, { id }, { photon, user }: Context) => {
    const comment = await photon.comments.findOne({
      include: {
        user: true
      },
      where: {
        id
      }
    })

    if (!comment) {
      return true
    }

    return comment.user.id === user.id
  }
)

export default shield({
  Query: {
    post: isAuthenticated,
    posts: isAuthenticated,
    profile: isAuthenticated,
    search: isAuthenticated
  },
  Mutation: {
    createComment: isAuthenticated,
    createPost: isAuthenticated,
    deleteComment: isCommentOwner,
    deletePost: isPostOwner,
    ratePost: isAuthenticated,
    updateProfile: isAuthenticated
  }
})
