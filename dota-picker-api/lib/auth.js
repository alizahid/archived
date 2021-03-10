const get = require('lodash.get')

const User = require('../models/user')

const error = require('./error')

module.exports = (request, reply, next, admin = false) => {
  const token = get(request, 'headers.auth')

  if (!token) {
    const err = error('Token not found', 400)

    return next(err)
  }

  User.findOne()
    .where('token')
    .eq(token)
    .select('username token admin')
    .then(user => {
      if (!user || (admin && !user.admin)) {
        const err = error('User not found', 404)

        return next(err)
      }

      request.user = user

      next()
    })
}
