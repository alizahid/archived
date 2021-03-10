import React from 'react'
import { TouchableOpacity } from 'react-native'
import { create } from 'react-test-renderer'

import Preview from '../../src/components/preview'

import { article } from '../fixtures'

it('renders', () => {
  const tree = create(<Preview article={article} onPress={() => {}} />)

  expect(tree).toMatchSnapshot()
})

it('tap', () => {
  const tree = create(<Preview article={article} onPress={() => {}} />)

  tree.root.findByType(TouchableOpacity).props.onPress()

  expect(tree).toMatchSnapshot()
})
