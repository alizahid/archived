import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

export default class Button extends Component {
  state = {
    pressed: new Animated.Value(0)
  }

  onPressIn = () => {
    const { pressed } = this.state

    Animated.timing(pressed, {
      duration: 200,
      toValue: 1
    }).start()
  }

  onPressOut = () => {
    const { pressed } = this.state

    Animated.timing(pressed, {
      duration: 200,
      toValue: 0
    }).start()
  }

  render() {
    const { label, style, onPress } = this.props
    const { pressed } = this.state

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View
          style={[
            styles.main,
            style,
            {
              borderColor: pressed.interpolate({
                inputRange: [0, 1],
                outputRange: ['#fff', '#fd902b']
              })
            }
          ]}
        >
          <Text style={styles.label}>{label}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    borderBottomWidth: 2,
    height: 40,
    justifyContent: 'center'
  },
  label: {
    color: '#e80c30',
    fontWeight: '500'
  }
})
