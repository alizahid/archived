import { FastifyRequest } from 'fastify'
import f from 'fluent-schema'
import createError from 'http-errors'

import { getPeople, getPerson, searchForPeople } from '../lib/star-wars'
import { FastifyRoute } from '../types'

type PeopleRequest = FastifyRequest<{
  Querystring: {
    page?: string
  }
}>

type PersonByIdRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>

type PersonSearchRequest = FastifyRequest<{
  Querystring: {
    query: string
  }
}>

export const starWars: FastifyRoute = (fastify, options, next) => {
  fastify.route({
    handler: async (request: PeopleRequest) => {
      const { query } = request

      const page = query.page ? Number(query.page) : 1

      const people = await getPeople(page)

      return {
        meta: {
          items: people.length,
          page
        },
        people
      }
    },
    method: 'GET',
    schema: {
      querystring: f.object().prop('page', f.integer()),
      response: {
        200: f
          .object()
          .prop('meta', f.ref('#meta'))
          .prop('people', f.array().items(f.ref('#person')))
      }
    },
    url: '/people'
  })

  fastify.route({
    handler: async (request: PersonByIdRequest) => {
      const {
        params: { id }
      } = request

      const person = await getPerson(Number(id))

      if (!person) {
        throw createError(404, 'Person not found')
      }

      return {
        person
      }
    },
    method: 'GET',
    schema: {
      params: f.object().prop('id', f.integer()),
      response: {
        200: f.object().prop('person', f.ref('#person'))
      }
    },
    url: '/people/:id'
  })

  fastify.route({
    handler: async (request: PersonSearchRequest) => {
      const {
        query: { query }
      } = request

      const people = await searchForPeople(query)

      return {
        people
      }
    },
    method: 'GET',
    schema: {
      querystring: f.object().prop('query', f.string().required()),
      response: {
        200: f.object().prop('people', f.array().items(f.ref('#person')))
      }
    },
    url: '/people/search'
  })

  next()
}
