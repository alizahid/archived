import React, { Component } from 'react'
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  NavigationActions,
  TabNavigator,
  StackNavigator
} from 'react-navigation'

import { TabBar } from './components'
import { sentry } from './lib'
import { Calculator, Home, Landing, Fares, FaresOther } from './scenes'
import { Colors } from './styles'

const calculator = StackNavigator(
  {
    index: {
      screen: Calculator
    },
    fares: {
      screen: Fares
    },
    other: {
      screen: FaresOther
    }
  },
  {
    headerMode: 'none'
  }
)

const app = TabNavigator(
  {
    home: {
      screen: Home
    },
    calculator: {
      screen: calculator
    }
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom'
  }
)

export const Navigator = StackNavigator({
  landing: {
    screen: Landing
  },
  app: {
    screen: app
  }
})

class Metro extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
  }

  backHandler = () => {
    const { dispatch, state } = this.props

    const current = state.routes[state.index].routeName

    if (current !== 'home') {
      const back = NavigationActions.back()

      dispatch(back)

      return true
    }
  }

  render() {
    const { dispatch, state } = this.props

    const navigation = addNavigationHelpers({
      dispatch,
      state
    })

    const Main = Platform.OS === 'ios' ? KeyboardAvoidingView : View

    return (
      <Main style={styles.container} behavior="padding">
        <StatusBar backgroundColor={Colors.primary} />
        <Navigator navigation={navigation} />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = ({ dispatch, state }) => ({
  dispatch,
  state
})

export default connect(mapStateToProps)(Metro)
