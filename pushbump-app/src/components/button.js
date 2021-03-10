import React, { Component } from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View
} from 'react-native'

export default class Button extends Component {
  render() {
    const { label, loading, onPress } = this.props

    if (loading) {
      return (
        <View style={styles.main}>
          <View style={styles.loading}>
            <ActivityIndicator color="#fff" />
          </View>
        </View>
      )
    }

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={onPress}>
          <View style={styles.main}>
            <Text style={styles.label}>{label}</Text>
          </View>
        </TouchableNativeFeedback>
      )
    }

    return (
      <View style={styles.main}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#111',
    borderRadius: 5
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 12
  },
  label: {
    color: '#fff',
    marginHorizontal: 30,
    marginVertical: 15,
    textAlign: 'center'
  }
})
