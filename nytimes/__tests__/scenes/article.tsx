import 'react-native'
import React from 'react'
import { create } from 'react-test-renderer'

import { StoreProvider } from 'easy-peasy'

import Article from '../../src/scenes/article'
import { store } from '../../src/store'

import { data } from '../fixtures'

beforeAll(async () => {
  fetch.mockResponseOnce(JSON.stringify(data))

  await store.dispatch.articles.fetchArticles(1)
})

it('renders', async () => {
  const navigation: any = {
    getParam: () => 100000006515727
  }

  const tree = create(
    <StoreProvider store={store}>
      <Article navigation={navigation} />
    </StoreProvider>
  )

  expect(tree).toMatchSnapshot()
})

it('not found', async () => {
  const navigation: any = {
    getParam: () => 1
  }

  const tree = create(
    <StoreProvider store={store}>
      <Article navigation={navigation} />
    </StoreProvider>
  )

  expect(tree).toMatchSnapshot()
})
