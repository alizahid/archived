const test = require('ava')

const server = require('../')

test('is fastify instance', t => {
  t.true(server.name === 'fastify')
})
