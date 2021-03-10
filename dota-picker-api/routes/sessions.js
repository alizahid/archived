const get = require('lodash.get')

const User = require('../models/user')

const error = require('../lib/error')
const password = require('../lib/password')

const schemaUser = require('../schemas/user')

const login = {
  method: 'POST',
  url: '/sessions',
  schema: schemaUser,
  async handler(request) {
    const props = get(request, 'body.user')

    const user = await User.findOne()
      .where('username')
      .eq(props.username)
      .select('username password admin token')

    if (!user) {
      throw error('User not found', 404)
    }

    const correctPassword = await password.compare(
      props.password,
      user.password
    )

    if (!correctPassword) {
      throw error('Incorrect password', 401)
    }

    return {
      user
    }
  }
}

module.exports = (fastify, options, next) => {
  fastify.route(login)

  next()
}
