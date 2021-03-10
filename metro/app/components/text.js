import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

import { Colors } from '../styles'

export default class BlackText extends Component {
  render() {
    const props = this.props

    return <Text {...props} style={[styles.text, props.style]} />
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.text
  }
})
