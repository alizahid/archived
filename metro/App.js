import React, { Component } from 'react'

import { Provider } from 'react-redux'
import configureStore from './app/redux/configure-store'

import App from './app/index'

const store = configureStore()

export default class Metro extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
