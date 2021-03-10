const { PORT } = process.env

import fastify from 'fastify'
import cors from 'fastify-cors'

export const server = fastify()

server.register(cors)

import { sequelize } from './models'
import { posts, users } from './routes'

server.register(posts)
server.register(users)

server.get('/', (request, reply) => {
  reply.send({
    hello: 'world'
  })
})

const go = async (): Promise<void> => {
  await sequelize.authenticate()

  // not using migrations for this test
  await sequelize.sync({
    alter: true
  })

  const address = await server.listen(Number(PORT), '0.0.0.0')

  console.log(`Listening on ${address}`)
}

go()
