import React from 'react'
import { Provider } from 'mobx-react'

import DotaPicker from './app/index'

import store from './app/store'

export default () => (
  <Provider store={store}>
    <DotaPicker />
  </Provider>
)
