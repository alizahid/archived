const { MONGODB_URI, NODE_ENV, PORT } = process.env

const cors = require('cors')()
const fastify = require('fastify')({
  logger: NODE_ENV === 'dev'
})
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URI, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

fastify.use(cors)

const heroes = require('./routes/heroes')
const sessions = require('./routes/sessions')
const users = require('./routes/users')

fastify.register(heroes)
fastify.register(sessions)
fastify.register(users)

fastify.listen(PORT, err => {
  if (err) {
    throw err
  }

  console.log(`server listening on ${fastify.server.address().port}`)
})

module.exports = fastify
