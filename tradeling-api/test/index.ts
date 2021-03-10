import dotenv from 'dotenv'

dotenv.config()

import ava, { ExecutionContext, TestInterface } from 'ava'
import axios from 'axios'
import { Server } from 'http'

import { init } from '../src/server'

interface Context {
  server: Server
  url: string
}

const test = ava as TestInterface<Context>

test.before(async (t) => {
  const port = Number(process.env.PORT) + 3

  t.context.server = init().listen(port)
  t.context.url = `http://localhost:${port}/api`
})

test.after.always((t) => {
  t.context.server.close()
})

const request = async <T>(
  t: ExecutionContext<Context>,
  uri: string,
  body?: Record<string, string>
): Promise<T> => {
  const { data } = await axios.request<T>({
    data: body,
    method: body ? 'post' : 'get',
    url: t.context.url + uri
  })

  return data
}

test('server starts', async (t) => {
  t.true(t.context.server instanceof Server)
})

test('server returns users', async (t) => {
  t.timeout(1000 * 60)

  const { results } = await request(t, '/search', {
    query: 'designplox',
    type: 'users'
  })

  t.true(Array.isArray(results))
})

test('server returns repositories', async (t) => {
  t.timeout(1000 * 60)

  const { results } = await request(t, '/search', {
    query: 'alizahid',
    type: 'repositories'
  })

  t.true(Array.isArray(results))
})

test('server returns users without cache', async (t) => {
  t.timeout(1000 * 60)

  await request(t, '/clear-cache')

  const { results } = await request(t, '/search', {
    query: 'designplox',
    type: 'users'
  })

  t.true(Array.isArray(results))
})

test('server returns repositories without cache', async (t) => {
  t.timeout(1000 * 60)

  await request(t, '/clear-cache')

  const { results } = await request(t, '/search', {
    query: 'alizahid',
    type: 'repositories'
  })

  t.true(Array.isArray(results))
})

test('server throws error on wrong type', async (t) => {
  await t.throwsAsync(() =>
    request(t, '/search', {
      query: 'alizahid',
      type: 'foo'
    })
  )
})
