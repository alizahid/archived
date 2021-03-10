import React from 'react'
import { create } from 'react-test-renderer'

import Separator from '../../src/components/separator'

it('renders', () => {
  const tree = create(<Separator />)

  expect(tree).toMatchSnapshot()
})
