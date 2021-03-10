import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { MapView } from 'expo'

import { Colors, Layout } from '../styles'

export default class Station extends Component {
  getId(name, separator = ' ') {
    const words = name.split(separator).slice(0, 2)

    if (words.length < 2) {
      return this.getId(name, '')
    }

    return words
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  render() {
    const { onPress, coordinates, line, name, type } = this.props

    return (
      <MapView.Marker coordinate={coordinates} onPress={onPress}>
        <View
          style={[
            styles.marker,
            type === 'metro'
              ? styles[`marker_${line}`]
              : styles[`marker_${type}`]
          ]}
        >
          <Text
            style={[
              styles.label,
              type === 'metro'
                ? styles[`label_${line}`]
                : styles[`label_${type}`]
            ]}
          >
            {this.getId(name)}
          </Text>
        </View>
      </MapView.Marker>
    )
  }
}

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 3,
    height: 32,
    justifyContent: 'center',
    width: 32
  },
  marker_green: {
    borderColor: Colors.green
  },
  marker_red: {
    borderColor: Colors.red
  },
  marker_monorail: {
    borderColor: Colors.monorail
  },
  marker_tram: {
    borderColor: Colors.tram
  },
  label: {
    backgroundColor: 'transparent',
    color: Colors.text,
    fontWeight: 'bold'
  },
  label_green: {
    color: Colors.green
  },
  label_red: {
    color: Colors.red
  },
  label_monorail: {
    color: Colors.monorail
  },
  label_tram: {
    color: Colors.tram
  }
})
