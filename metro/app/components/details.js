import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { Text, Touchable } from './'
import { Colors, Fonts, Layout } from '../styles'

import close from '../assets/delete.png'

import station_green from '../assets/station_green.png'
import station_monorail from '../assets/station_monorail.png'
import station_red from '../assets/station_red.png'
import station_tram from '../assets/station_tram.png'

const stations = {
  green: station_green,
  monorail: station_monorail,
  red: station_red,
  tram: station_tram
}

export default class Details extends Component {
  render() {
    const {
      area,
      connections,
      coordinates,
      image,
      line,
      name,
      numbers,
      onClose,
      type,
      zone
    } = this.props

    const metro = type === 'metro'
    const tram = type === 'tram'
    const monorail = type === 'monorail'

    const icon = stations[metro ? line : type]

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          {metro && (
            <View>
              <View style={styles.line}>
                <Text style={styles.strong}>number</Text>
                <Text style={styles.value}>
                  {numbers.map(({ line, number }, index) => (
                    <Text style={[styles[line]]} key={`${line}-${number}`}>
                      {index > 0 && ' '}
                      {number} ({line} line)
                    </Text>
                  ))}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.strong}>area</Text>
                <Text style={styles.value}>{area}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.strong}>zone</Text>
                <Text style={styles.value}>{zone}</Text>
              </View>
            </View>
          )}
          <View style={styles.line}>
            <Text style={styles.strong}>type</Text>
            <Text style={styles.value}>{type}</Text>
          </View>
          {(tram || monorail) &&
            connections && (
              <View>
                <Text style={styles.connections}>Connections</Text>
                {connections.map(({ name, type }) => (
                  <View key={`${type}-${name}`} style={styles.line}>
                    <Text style={styles.strong}>{type}</Text>
                    <Text style={styles.value}>{name}</Text>
                  </View>
                ))}
              </View>
            )}
          <Image style={styles.icon} source={icon} />
        </View>
        <Touchable style={styles.closeContainer} onPress={onClose}>
          <Image style={styles.close} source={close} />
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Colors.shadow,
    backgroundColor: Colors.background,
    bottom: 0,
    left: 0,
    paddingBottom: Layout.margin + Layout.buttonHeight,
    position: 'absolute',
    right: 0
  },
  content: {
    padding: Layout.margin
  },
  name: {
    ...Fonts.heading
  },
  closeContainer: {
    position: 'absolute',
    right: 0
  },
  close: {
    height: 20,
    margin: Layout.padding,
    width: 20
  },
  connections: {
    marginTop: Layout.margin
  },
  line: {
    flexDirection: 'row',
    marginTop: Layout.padding
  },
  strong: {
    flex: 1,
    fontWeight: '600'
  },
  value: {
    flex: 3
  },
  icon: {
    alignSelf: 'flex-end',
    height: 32,
    marginTop: Layout.padding,
    width: 32
  },
  green: {
    color: Colors.green
  },
  red: {
    color: Colors.red
  },
  space: {
    marginLeft: 10
  }
})
