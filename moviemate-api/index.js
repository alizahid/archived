const { NODE_ENV, ADDRESS = '0.0.0.0', PORT = '3000' } = process.env

const cors = require('cors')()
const fastify = require('fastify')

const server = fastify()

server.use(cors)

const routes = require('./routes')

server.register(routes)

server.listen(PORT, ADDRESS, err => {
  if (err) {
    throw err
  }

  if (NODE_ENV === 'dev') {
    console.log(`server listening on ${server.server.address().port}`)
  }
})

server.setErrorHandler((error, request, reply) => {
  const { code = 500, message } = error

  reply.status(code).send({
    error: message
  })

  if (NODE_ENV === 'dev') {
    console.error(error)
  }
})

module.exports = server
