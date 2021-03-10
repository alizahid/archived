import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default class TextBox extends Component {
  render() {
    const { placeholder, onChangeText } = this.props

    return (
      <TextInput
        style={styles.container}
        autoCorrect={false}
        autoFocus={true}
        blurOnSubmit={true}
        clearButtonMode="always"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        underlineColorAndroid="transparent"
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242425',
    color: 'white',
    height: 50,
    paddingHorizontal: 15
  }
})
