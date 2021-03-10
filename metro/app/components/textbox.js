import React, { Component } from 'react'
import { Image, Keyboard, StyleSheet, TextInput, View } from 'react-native'

import { Touchable } from './'
import { Colors, Fonts, Layout } from '../styles'

import clear from '../assets/delete.png'

export default class TextBox extends Component {
  state = {
    length: 0
  }

  onChangeText = value => {
    const { onChangeText } = this.props

    onChangeText(value)

    this.setState({
      length: value.length
    })
  }

  clear = () => {
    this.onChangeText('')

    this.refs.textbox.clear()

    Keyboard.dismiss()
  }

  render() {
    const {
      autoCapitalize,
      autoCorrect,
      clearButton,
      keyboardType,
      multiline,
      placeholder,
      secureTextEntry,
      style,
      styleInput,
      value
    } = this.props
    const { length } = this.state

    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref="textbox"
          style={[styles.input, styleInput]}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={this.onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          underlineColorAndroid="transparent"
          value={value}
        />
        {clearButton &&
          length > 0 && (
            <Touchable onPress={this.clear}>
              <Image style={styles.clear} source={clear} />
            </Touchable>
          )}
      </View>
    )
  }
}

const half = Layout.inputHeight / 2

const styles = StyleSheet.create({
  container: {
    ...Colors.shadow,
    backgroundColor: Colors.background,
    borderRadius: Layout.radius,
    flexDirection: 'row'
  },
  input: {
    color: Colors.text,
    flex: 1,
    fontSize: Fonts.input,
    height: Layout.inputHeight,
    paddingHorizontal: Layout.margin
  },
  clear: {
    height: half,
    margin: half / 2,
    width: half
  }
})
