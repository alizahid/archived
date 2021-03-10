import React from 'react'
import { create } from 'react-test-renderer'

import NotFound from '../../src/components/not-found'

it('renders', () => {
  const tree = create(<NotFound />)

  expect(tree).toMatchSnapshot()
})
