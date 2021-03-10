import test from 'ava'
import Chance from 'chance'

import { sequelize } from '../src/models'
import { PostService, UserService } from '../src/services'

const chance = new Chance()

const password = 'test'

test.before(async () => {
  await sequelize.authenticate()
  await sequelize.sync({
    force: true
  })
})

test('sign up', async (t) => {
  const username = chance.name()

  const { token, user } = await UserService.signUp({
    password,
    username
  })

  t.truthy(token)

  t.is(user.username, username)
})

test('sign in', async (t) => {
  const username = chance.name()

  await UserService.signUp({
    password,
    username
  })

  const { token, user } = await UserService.signIn({
    password,
    username
  })

  t.truthy(token)

  t.is(user.username, username)
})

test('get all posts', async (t) => {
  const username = chance.name()

  const { token } = await UserService.signUp({
    password,
    username
  })

  await PostService.create(
    {
      'x-token': token
    },
    {
      body: chance.paragraph(),
      title: chance.sentence()
    }
  )

  const posts = await PostService.getAll({
    limit: 1
  })

  t.is(posts.length, 1)
})

test('get post', async (t) => {
  const username = chance.name()

  const { token } = await UserService.signUp({
    password,
    username
  })

  const title = chance.sentence()
  const body = chance.paragraph()

  const { id } = await PostService.create(
    {
      'x-token': token
    },
    {
      body,
      title
    }
  )

  const post = await PostService.getById({
    id
  })

  t.is(post.title, title)
  t.is(post.body, body)
})

test('create post', async (t) => {
  const username = chance.name()

  const { token } = await UserService.signUp({
    password,
    username
  })

  const title = chance.sentence()
  const body = chance.paragraph()

  const post = await PostService.create(
    {
      'x-token': token
    },
    {
      body,
      title
    }
  )

  t.is(post.title, title)
  t.is(post.body, body)
})
