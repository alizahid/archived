const { PORT } = process.env

import fastify from 'fastify'

import { crypto } from './routes/crypto'
import { starWars } from './routes/star-wars'
import { schemas } from './schemas'

const main = async () => {
  const server = fastify()

  Object.values(schemas).forEach((schema) => server.addSchema(schema))

  server.register(crypto)
  server.register(starWars)

  const address = await server.listen(Number(PORT), '0.0.0.0')

  console.log(`Listening on ${address}`)

  process.on('SIGTERM', () => {
    server.close()

    process.exit()
  })
}

main()
