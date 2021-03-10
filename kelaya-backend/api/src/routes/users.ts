import fp from 'fastify-plugin'

import { UserService } from '../services'

export const users = fp((fastify, opts, next) => {
  // sign up
  fastify.route({
    async handler({ body }) {
      return UserService.signUp(body)
    },
    method: 'POST',
    url: '/users'
  })

  // sign in
  fastify.route({
    async handler({ body }) {
      return UserService.signIn(body)
    },
    method: 'POST',
    url: '/users/auth'
  })

  next()
})
