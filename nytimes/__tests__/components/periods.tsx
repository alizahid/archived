import React from 'react'
import { TouchableOpacity } from 'react-native'
import { act, create } from 'react-test-renderer'

import { StoreProvider } from 'easy-peasy'

import Periods from '../../src/components/periods'
import { store } from '../../src/store'

it('renders', () => {
  const tree = create(
    <StoreProvider store={store}>
      <Periods />
    </StoreProvider>
  )

  expect(tree).toMatchSnapshot()
})

it('tap', () => {
  const tree = create(
    <StoreProvider store={store}>
      <Periods />
    </StoreProvider>
  )

  act(() => {
    tree.root.findAllByType(TouchableOpacity)[0].props.onPress(1)
  })

  expect(tree).toMatchSnapshot()
})
