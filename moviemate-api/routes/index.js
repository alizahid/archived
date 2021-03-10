const get = require('lodash.get')
const intersectionBy = require('lodash.intersectionby')
const orderBy = require('lodash.orderby')

const cache = require('../lib/cache')
const error = require('../lib/error')
const tmdb = require('../lib/tmdb')

const hello = {
  method: 'GET',
  url: '/',
  handler(request, reply) {
    reply.redirect('https://moviemate.co')
  }
}

const search = {
  method: 'GET',
  url: '/search',
  async handler(request) {
    const query = get(request, 'query.query', '')
      .toLowerCase()
      .trim()

    if (!query) {
      throw error.boom(400, 'Missing query')
    }

    const results = await cache.fetch(query, query => tmdb.search(query))

    return {
      results
    }
  }
}

const matches = {
  method: 'GET',
  url: '/matches/:one/:two',
  async handler(request) {
    const one = Number(get(request, 'params.one'))
    const two = Number(get(request, 'params.two'))

    if (!one || !two) {
      throw error.boom(400, 'Missing parameters')
    }

    const data = await Promise.all([
      await cache.fetch(String(one), query => tmdb.films(query)),
      await cache.fetch(String(two), query => tmdb.films(query))
    ])

    const people = data.map(({ id, name, image }) => ({
      id,
      name,
      image
    }))

    const [first, second] = data

    const films = orderBy(
      intersectionBy(first.films, second.films, 'id'),
      'year',
      'desc'
    )

    return {
      films,
      people
    }
  }
}

module.exports = (fastify, options, next) => {
  fastify.route(hello)
  fastify.route(search)
  fastify.route(matches)

  next()
}
