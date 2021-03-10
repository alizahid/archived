import fp from 'fastify-plugin'

import { PostService } from '../services'
import { CreatePostRequestHeaders, GetPostRequestParams } from '../types'

export const posts = fp((fastify, opts, next) => {
  // get all posts
  fastify.route({
    async handler({ query }) {
      const posts = await PostService.getAll(query)

      return {
        posts
      }
    },
    method: 'GET',
    url: '/posts'
  })

  // get post
  fastify.route<{}, GetPostRequestParams>({
    async handler({ params }) {
      const post = await PostService.getById(params)

      return {
        post
      }
    },
    method: 'GET',
    url: '/posts/:id'
  })

  // create post
  fastify.route<{}, {}, CreatePostRequestHeaders>({
    async handler({ body, headers }) {
      const post = await PostService.create(headers, body)

      return {
        post
      }
    },
    method: 'POST',
    url: '/posts'
  })

  next()
})
