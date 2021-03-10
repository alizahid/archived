import { FastifyInstance } from 'fastify'

export type FastifyRoute = (
  fastify: FastifyInstance,
  options: unknown,
  next: () => void
) => void

export type CurrencyMetaResponse = {
  data: {
    id: number
    name: string
    symbol: string
    slug: string
    rank: number
  }[]
}

export type PeopleResponse = {
  results: {
    uid: string
    name: string
  }[]
}

export type PersonResponse = {
  result: {
    uid: string
    properties: {
      name: string
    }
  }
}

export type PersonSearchResponse = {
  results: {
    uid: string
    properties: {
      name: string
    }
  }[]
}

export type Entity = {
  id: number
  data: Record<string, unknown>
}

export type Meta = {
  items: number
  page: number
}
