// @ts-ignore
import { API_URI } from 'react-native-dotenv'

import React, { FunctionComponent } from 'react'
import { KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { ApolloProvider } from 'react-apollo-hooks'
import ApolloClient from 'apollo-boost'

import { TabBar } from './components'
import { state } from './data'
import { storage } from './lib'
import {
  Auth,
  Conversation,
  Conversations,
  Create,
  Feed,
  Post,
  Search,
  Settings
} from './scenes'

const App = createBottomTabNavigator(
  {
    Feed: createStackNavigator({
      Feed,
      Post
    }),
    Search: createStackNavigator({
      Search
    }),
    Create: createStackNavigator({
      Create
    }),
    Conversations: createStackNavigator({
      Conversations,
      Conversation
    }),
    Settings: createStackNavigator({
      Settings
    })
  },
  {
    tabBarComponent: TabBar
  }
)

const Navigator = createStackNavigator(
  {
    Auth,
    App
  },
  {
    headerMode: 'none'
  }
)

const Bother: FunctionComponent = () => {
  const client = new ApolloClient({
    clientState: state,
    async request(operation) {
      const headers: any = {}

      const token = await storage.getItem('token')

      if (token) {
        headers.authorization = `Bearer ${token}`
      }

      operation.setContext({
        headers
      })
    },
    uri: API_URI
  })

  const Container = createAppContainer(Navigator)

  return (
    <KeyboardAvoidingView style={styles.main} behavior="padding">
      <StatusBar barStyle="default" />
      <ApolloProvider client={client}>
        <Container />
      </ApolloProvider>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default Bother
