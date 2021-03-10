import { FindManyPostArgs } from '@generated/photon'
import { UserInputError } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import { sumBy } from 'lodash'
import moment from 'moment'

import { createToken } from './auth'
import { Context, PostType } from './types'

const resolvers: IResolvers = {
  Query: {
    profile(parent, args, { user }: Context) {
      return user
    },

    async post(parent, { id }, { photon, user }: Context) {
      const post = await photon.posts.findOne({
        include: {
          comments: true,
          location: true,
          user: true
        },
        where: {
          id
        }
      })

      const [rating] = await photon.ratings.findMany({
        where: {
          post: {
            id
          },
          user: {
            id: user.id
          }
        }
      })

      return {
        ...post,
        rated: Boolean(rating)
      }
    },
    async posts(
      parent,
      { limit = 20, location, offset = 0, type = PostType.LATEST },
      { photon, user }: Context
    ) {
      const options: FindManyPostArgs = {
        first: limit,
        include: {
          location: true,
          user: true
        },
        orderBy: {
          created: 'desc'
        },
        skip: offset,
        where: {}
      }

      if (type === PostType.NEARBY) {
        if (!location) {
          throw new UserInputError('Location is required')
        }

        const { city, country } = location

        const [area] = await photon.locations.findMany({
          first: 1,
          where: {
            city,
            country
          }
        })

        if (!area) {
          return []
        }

        options.where = {
          location: {
            id: area.id
          }
        }
      } else if (type === PostType.POPULAR) {
        options.orderBy = {
          rating: 'desc'
        }
        options.where = {
          created: {
            gt: moment()
              .subtract(5, 'days')
              .startOf('day')
              .toDate()
          }
        }
      }

      const posts = await photon.posts.findMany(options)

      const ratings = await photon.ratings.findMany({
        include: {
          post: true
        },
        where: {
          post: {
            id: {
              in: posts.map(({ id }) => id)
            }
          },
          user: {
            id: user.id
          }
        }
      })

      return posts.map(post => ({
        ...post,
        rated: Boolean(ratings.find(({ post: { id } }) => id === post.id))
      }))
    },

    async search(parent, { query }, { photon, user }: Context) {
      const posts = await photon.posts.findMany({
        include: {
          location: true,
          user: true
        },
        where: {
          body: {
            contains: query
          }
        }
      })

      const ratings = await photon.ratings.findMany({
        include: {
          post: true
        },
        where: {
          post: {
            id: {
              in: posts.map(({ id }) => id)
            }
          },
          user: {
            id: user.id
          }
        }
      })

      return posts.map(post => ({
        ...post,
        rated: Boolean(ratings.find(({ post: { id } }) => id === post.id))
      }))
    }
  },
  Mutation: {
    async register(parent, args, { photon }: Context) {
      const user = await photon.users.create({
        data: {}
      })

      const token = await createToken(user)

      return {
        token,
        user
      }
    },
    async updateProfile(parent, { notifications }, { photon, user }: Context) {
      if (notifications !== undefined && user.notifications !== notifications) {
        const updated = await photon.users.update({
          data: {
            notifications
          },
          where: {
            id: user.id
          }
        })

        return updated
      }

      return user
    },

    async createPost(
      parent,
      { body, location: { city, country } },
      { photon, user }: Context
    ) {
      const [location] = await photon.locations.findMany({
        first: 1,
        where: {
          city,
          country
        }
      })

      const post = await photon.posts.create({
        data: {
          body,
          location: location
            ? {
                connect: {
                  id: location.id
                }
              }
            : {
                create: {
                  city,
                  country
                }
              },
          ratings: {
            create: {
              direction: 1,
              user: {
                connect: {
                  id: user.id
                }
              }
            }
          },
          user: {
            connect: {
              id: user.id
            }
          }
        },
        include: {
          location: true,
          user: true
        }
      })

      return {
        ...post,
        rated: true
      }
    },
    async ratePost(parent, { direction, id }, { photon, user }: Context) {
      direction = direction > 0 ? 1 : -1

      const [rating] = await photon.ratings.findMany({
        first: 1,
        where: {
          post: {
            id
          },
          user: {
            id: user.id
          }
        }
      })

      if (!rating) {
        await photon.ratings.create({
          data: {
            direction,
            post: {
              connect: {
                id
              }
            },
            user: {
              connect: {
                id: user.id
              }
            }
          }
        })
      } else if (rating && rating.direction !== direction) {
        await photon.ratings.update({
          data: {
            direction,
            user: {
              connect: {
                id: user.id
              }
            }
          },
          where: {
            id: rating.id
          }
        })
      }

      const ratings = await photon.ratings.findMany({
        where: {
          post: {
            id
          }
        }
      })

      const post = await photon.posts.findOne({
        where: {
          id
        }
      })

      const updated = sumBy(ratings, 'direction')

      if (post.rating !== updated) {
        await photon.posts.update({
          data: {
            rating: updated
          },
          where: {
            id
          }
        })
      }

      return {
        rated: true,
        rating: updated
      }
    },
    async deletePost(parent, { id }, { photon }: Context) {
      await photon.posts.delete({
        where: {
          id
        }
      })

      return {
        success: true
      }
    },

    async createComment(parent, { body, id }, { photon, user }: Context) {
      const comment = await photon.comments.create({
        include: {
          user: true
        },
        data: {
          body,
          post: {
            connect: {
              id
            }
          },
          user: {
            connect: {
              id: user.id
            }
          }
        }
      })

      return comment
    },
    async deleteComment(parent, { id }, { photon }: Context) {
      await photon.comments.delete({
        where: {
          id
        }
      })

      return {
        success: true
      }
    }
  }
}

export default resolvers
