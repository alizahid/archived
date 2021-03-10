import 'react-native'

import { store } from '../../src/store'

import { data } from '../fixtures'

it('setLoading', () => {
  store.dispatch.articles.setLoading(true)

  expect(store.getState().articles.loading).toEqual(true)
})

it('setInterval', () => {
  store.dispatch.articles.setInterval(7)

  expect(store.getState().articles.interval).toEqual(7)
})

it('setArticles', () => {
  store.dispatch.articles.setArticles([])

  expect(store.getState().articles.articles).toEqual([])
})

it('fetchArticles', async () => {
  expect(store.getState().articles.articles).toEqual([])

  fetch.mockResponseOnce(JSON.stringify(data))

  await store.dispatch.articles.fetchArticles(1)

  expect(store.getState().articles.articles.length).toBeGreaterThan(0)
})
