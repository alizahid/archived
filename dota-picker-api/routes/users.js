const get = require('lodash.get')

const User = require('../models/user')
const Log = require('../models/log')

const auth = require('../lib/auth')
const error = require('../lib/error')
const password = require('../lib/password')
const token = require('../lib/token')

const schemaUser = require('../schemas/user')
const schemaUsers = require('../schemas/users')
const schemaLogs = require('../schemas/logs-user')

const getMe = {
  method: 'GET',
  url: '/users/me',
  schema: schemaUser,
  beforeHandler: auth,
  async handler(request) {
    const { user } = request

    return {
      user
    }
  }
}

const changePassword = {
  method: 'POST',
  url: '/users/password',
  beforeHandler: auth,
  async handler(request) {
    const { _id } = request.user

    const user = await User.findById(_id).select('password')

    const props = get(request, 'body.password')

    const correctPassword = await password.compare(
      props.password,
      user.password
    )

    if (!correctPassword) {
      throw error('Incorrect password', 401)
    }

    user.password = await password.hash(props.newPassword)

    await user.save()

    return {
      message: 'Password updated'
    }
  }
}

const getLogs = {
  method: 'GET',
  url: '/users/me/logs',
  schema: schemaLogs,
  beforeHandler: auth,
  async handler(request) {
    const { _id } = request.user

    const logs = await Log.where('user')
      .eq(_id)
      .limit(200)
      .sort('-created')

    return {
      logs
    }
  }
}

const getUsers = {
  method: 'GET',
  url: '/users',
  schema: schemaUsers,
  beforeHandler: (request, reply, next) => auth(request, reply, next, true),
  async handler(request) {
    const { user } = request

    const users = await User.find()
      .where('removed')
      .eq(null)
      .where('username')
      .ne(user.username)
      .select('username admin')
      .sort('username')

    return {
      users
    }
  }
}

const createUser = {
  method: 'POST',
  url: '/users',
  schema: schemaUser,
  beforeHandler: (request, reply, next) => auth(request, reply, next, true),
  async handler(request) {
    const props = get(request, 'body.user')

    const user = new User(props)

    user.password = await password.hash(user.password)
    user.token = await token.generate(`${user.username}:${Date.now()}`)

    await user.save()

    user.token = undefined

    return {
      user
    }
  }
}

const updateUser = {
  method: 'PUT',
  url: '/users/:id',
  schema: schemaUser,
  beforeHandler: (request, reply, next) => auth(request, reply, next, true),
  async handler(request) {
    const { id } = request.params
    const props = get(request, 'body.user')

    const user = await User.findById(id)

    if (user.removed) {
      throw error('User not found', 404)
    }

    if (props.password) {
      props.password = await password.hash(props.password)
      props.token = await token.generate(`${user.username}:${Date.now()}`)
    }

    user.set(props)

    await user.save()

    user.token = undefined

    return {
      user
    }
  }
}

const removeUser = {
  method: 'DELETE',
  url: '/users/:id',
  beforeHandler: (request, reply, next) => auth(request, reply, next, true),
  async handler(request) {
    const { _id } = request.user
    const { id } = request.params

    const why = get(request, 'body.user.why', null)

    if (_id.equals(id)) {
      throw error('Cannot remove yourself', 403)
    }

    const user = await User.findById(id)

    if (!user) {
      throw error('User not found', 404)
    }

    user.removed = {
      why,
      when: new Date()
    }

    await user.save()

    return {
      message: 'User removed'
    }
  }
}

module.exports = (fastify, options, next) => {
  fastify.route(getMe)
  fastify.route(changePassword)
  fastify.route(getLogs)

  fastify.route(getUsers)
  fastify.route(createUser)
  fastify.route(updateUser)
  fastify.route(removeUser)

  next()
}
