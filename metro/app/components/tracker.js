import React, { Component } from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'

import { Button, Touchable } from '../components'
import { location } from '../lib'
import { Colors, Layout } from '../styles'

import check from '../assets/check.png'

export default class Tracker extends Component {
  toggle = () => {
    const { track, onChange } = this.props

    onChange(!track)
  }

  render() {
    const { track, nearest } = this.props

    const label = track ? 'Stop tracking' : 'Start tracking'

    return (
      <View style={styles.container}>
        {track &&
          nearest && (
            <View style={styles.nearest}>
              <Text style={styles.label}>{nearest.name}</Text>
            </View>
          )}
        <Button
          style={[styles.button, styles[track ? 'stop' : 'start']]}
          styleTouchable={styles.touchable}
          label={label}
          onPress={this.toggle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    left: 0,
    padding: Layout.margin,
    position: 'absolute',
    right: 0
  },
  nearest: {
    ...Colors.shadow,
    backgroundColor: Colors.background,
    borderRadius: Layout.radius,
    flex: 1,
    height: Layout.buttonHeight,
    justifyContent: 'center',
    marginRight: Layout.margin,
    paddingHorizontal: Layout.margin
  },
  label: {
    color: Colors.text
  },
  button: {
    ...Colors.shadow
  },
  touchable: {
    paddingHorizontal: Layout.padding
  },
  start: {
    backgroundColor: Colors.success
  },
  stop: {
    backgroundColor: Colors.failure
  }
})
