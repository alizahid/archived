import React, { Component } from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'

export default class Touchable extends Component {
  render() {
    const { children, onPress, ...props } = this.props

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={onPress}>
          <View {...props}>{children}</View>
        </TouchableNativeFeedback>
      )
    }

    return (
      <TouchableOpacity {...props} onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  }
}
