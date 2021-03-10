import React, { FunctionComponent } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { StoreProvider } from 'easy-peasy'

import { Article, Home } from './scenes'
import { store } from './store'

const Navigator = createStackNavigator({
  Home,
  Article
})

const NYTimes: FunctionComponent = () => {
  const Container = createAppContainer(Navigator)

  return (
    <StoreProvider store={store}>
      <Container />
    </StoreProvider>
  )
}

export default NYTimes
