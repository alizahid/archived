import React from 'react'
import { create } from 'react-test-renderer'

import Loading from '../../src/components/loading'

it('renders', () => {
  const tree = create(<Loading />)

  expect(tree).toMatchSnapshot()
})

it('null on Android', () => {
  jest.doMock('Platform', () => ({
    OS: 'android'
  }))

  const tree = create(<Loading />).toJSON()

  expect(tree).toBe(null)
})
