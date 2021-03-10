import { FastifyRequest } from 'fastify'
import f from 'fluent-schema'
import createError from 'http-errors'

import { getAll, getOne } from '../lib/crypto'
import { FastifyRoute } from '../types'

type CurrenciesRequest = FastifyRequest<{
  Querystring: {
    page?: string
  }
}>

type CurrencyBySymbolRequest = FastifyRequest<{
  Params: {
    symbol: string
  }
}>

export const crypto: FastifyRoute = (fastify, options, next) => {
  fastify.route({
    handler: async (request: CurrenciesRequest) => {
      const { query } = request

      const page = query.page ? Number(query.page) : 1
      const start = (Number(page) - 1) * 10 + 1

      const currencies = await getAll(start)

      return {
        currencies,
        meta: {
          items: currencies.length,
          page
        }
      }
    },
    method: 'GET',
    schema: {
      querystring: f.object().prop('page', f.integer()),
      response: {
        200: f
          .object()
          .prop('meta', f.ref('#meta'))
          .prop('currencies', f.array().items(f.ref('#currency')))
      }
    },
    url: '/currencies'
  })

  fastify.route({
    handler: async (request: CurrencyBySymbolRequest) => {
      const {
        params: { symbol }
      } = request

      const currency = await getOne(symbol)

      if (!currency) {
        throw createError(404, 'Currency not found')
      }

      return {
        currency
      }
    },
    method: 'GET',
    schema: {
      response: {
        200: f.object().prop('currency', f.ref('#currency'))
      }
    },
    url: '/currencies/:symbol'
  })

  next()
}
