import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'

import { cache } from './lib'
import { Exception, SearchType } from './types'

export const init = (): Express => {
  const server = express()

  server.use(bodyParser.json())
  server.use(
    cors({
      origin: ['http://localhost:3000', 'https://tradeling-web.herokuapp.com']
    })
  )

  server.post<
    Record<string, string>,
    unknown,
    {
      query: string
      type: SearchType
    }
  >('/api/search', async (req, res, next) => {
    const { query, type } = req.body

    if (!['users', 'repositories'].includes(type)) {
      return next({
        code: 400,
        message: `Invalid type: ${type}`
      })
    }

    const results = await cache.get(query, type)

    res.json({
      results
    })
  })

  server.get('/api/clear-cache', async (req, res) => {
    await cache.clear()

    res.json({
      status: 'ok'
    })
  })

  server.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Exception, req: Request, res: Response, next: () => void) => {
      res.status(err.code).json({
        error: err.message
      })
    }
  )

  return server
}
