import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'

import { heart } from '../assets'

import Touchable from './touchable'

export default class Footer extends Component {
  open = () => {
    Linking.openURL('https://designplox.com')
  }

  render() {
    const { style } = this.props

    return (
      <View style={[styles.main, style]}>
        <Text style={styles.text}>Made with</Text>
        <Image style={styles.image} source={heart} />
        <Text style={styles.text}>by</Text>
        <Touchable onPress={this.open}>
          <Text style={styles.link}>Ali Zahid</Text>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    opacity: 0.25
  },
  text: {
    color: '#000'
  },
  image: {
    height: 16,
    marginHorizontal: 4,
    resizeMode: 'contain',
    width: 16
  },
  link: {
    color: '#e80c30',
    marginLeft: 4
  }
})
