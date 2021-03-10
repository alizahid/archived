import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { Text, Touchable } from './'
import { Colors, Fonts, Layout } from '../styles'

import left from '../assets/left.png'

export default class NavBar extends Component {
  render() {
    const { action, back, title } = this.props

    return (
      <View style={styles.container}>
        {back && (
          <Touchable style={styles.left} onPress={back}>
            <Image style={styles.image} source={left} />
          </Touchable>
        )}
        <Text style={styles.title}>{title}</Text>
        {action && (
          <Touchable style={styles.right} onPress={action.onPress}>
            <Image style={styles.image} source={action.icon} />
          </Touchable>
        )}
      </View>
    )
  }
}

const top = Expo.Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    ...Colors.shadow,
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: top + Layout.navBarHeight,
    justifyContent: 'center',
    paddingTop: top
  },
  left: {
    position: 'absolute',
    left: 0,
    top
  },
  right: {
    position: 'absolute',
    right: 0,
    top
  },
  image: {
    height: 20,
    margin: Layout.margin,
    width: 20
  },
  title: {
    ...Fonts.navBar,
    color: Colors.text
  }
})
