import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Button extends Component {
  render() {
    const { label, onPress } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242425'
  },
  label: {
    alignSelf: 'center',
    color: '#7eb0d6',
    margin: 20
  }
})
