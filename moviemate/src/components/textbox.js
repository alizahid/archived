import React, { Component } from 'react'
import { Animated, StyleSheet, TextInput } from 'react-native'

export default class TextBox extends Component {
  state = {
    focused: new Animated.Value(0)
  }

  componentWillReceiveProps(props) {
    let { value } = props

    this.setState({
      value
    })
  }

  onChangeText = value => {
    const { onChangeText } = this.props

    onChangeText(value)

    this.setState({
      value
    })
  }

  onFocus = () => {
    const { onFocus } = this.props
    const { focused } = this.state

    if (onFocus) {
      onFocus()
    }

    Animated.timing(focused, {
      duration: 200,
      toValue: 1
    }).start()
  }

  onBlur = () => {
    const { onBlur } = this.props
    const { focused } = this.state

    if (onBlur) {
      onBlur()
    }

    Animated.timing(focused, {
      duration: 200,
      toValue: 0
    }).start()
  }

  render() {
    const { placeholder, style } = this.props
    const { focused, value } = this.state

    return (
      <Animated.View
        style={[
          styles.main,
          style,
          {
            borderColor: focused.interpolate({
              inputRange: [0, 1],
              outputRange: ['#fff', '#e80c30']
            })
          }
        ]}
      >
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          value={value}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    borderBottomWidth: 2
  },
  input: {
    fontSize: 14,
    height: 40,
    padding: 0
  }
})
