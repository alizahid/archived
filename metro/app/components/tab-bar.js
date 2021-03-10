import React, { Component } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native'

import { Touchable } from './'
import { Colors, Layout } from '../styles'

import calculator from '../assets/calculator.png'
import home from '../assets/map.png'

const icons = {
  calculator,
  home
}

export default class TabBar extends Component {
  navigate = jump => {
    Keyboard.dismiss()

    const { navigation, jumpToIndex } = this.props

    if (jump === false) {
      navigation.goBack(null)
    } else {
      jumpToIndex(jump)
    }
  }

  render() {
    const { navigation, jumpToIndex } = this.props
    const { routes } = navigation.state

    return (
      <View style={styles.container}>
        {routes.map(({ key, routes }, index) => {
          const current = navigation.state.index === index

          const jump = routes && routes.length > 1 && current ? false : index

          return (
            <Touchable
              key={key}
              style={styles.button}
              onPress={() => this.navigate(jump)}
            >
              <Image
                style={[styles.icon, current && styles.current]}
                source={icons[key]}
              />
            </Touchable>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Colors.shadow,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingBottom: Expo.Constants.statusBarHeight === 44 ? Layout.margin * 2 : 0
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  icon: {
    height: 20,
    opacity: 0.25,
    width: 20
  },
  current: {
    opacity: 1
  }
})
