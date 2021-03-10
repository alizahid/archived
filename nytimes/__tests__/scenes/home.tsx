import React from 'react'
import { RefreshControl } from 'react-native'
import { act, create } from 'react-test-renderer'

import { StoreProvider } from 'easy-peasy'

import Home from '../../src/scenes/home'
import { Preview } from '../../src/components'
import { store } from '../../src/store'

import { data } from '../fixtures'

beforeAll(async () => {
  fetch.mockResponseOnce(JSON.stringify(data))

  await store.dispatch.articles.fetchArticles(1)
})

it('renders', () => {
  const navigation: any = {}

  const tree = create(
    <StoreProvider store={store}>
      <Home navigation={navigation} />
    </StoreProvider>
  )

  expect(tree).toMatchSnapshot()
})

it('refresh', () => {
  const navigation: any = {}

  const tree = create(
    <StoreProvider store={store}>
      <Home navigation={navigation} />
    </StoreProvider>
  )

  act(() => {
    tree.root.findByType(RefreshControl).props.onRefresh()
  })

  expect(tree).toMatchSnapshot()
})

it('navigate', () => {
  const navigation: any = {
    navigate: () => {}
  }

  const tree = create(
    <StoreProvider store={store}>
      <Home navigation={navigation} />
    </StoreProvider>
  )

  act(() => {
    tree.root.findAllByType(Preview)[0].props.onPress(123)
  })

  expect(tree).toMatchSnapshot()
})
