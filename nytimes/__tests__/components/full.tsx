import React from 'react'
import { create } from 'react-test-renderer'

import Full from '../../src/components/full'

import { article } from '../fixtures'

it('renders', () => {
  const tree = create(<Full article={article} />)

  expect(tree).toMatchSnapshot()
})
