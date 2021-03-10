import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { MapView } from 'expo'

import { location } from '../lib'
import { Colors, Layout } from '../styles'

export default class User extends Component {
  watchId = null

  state = {
    coordinates: null
  }

  componentDidMount() {
    location.current().then(coordinates =>
      this.setState({
        coordinates
      })
    )
  }

  componentWillReceiveProps(props) {
    const { track } = props
    const { onMove } = this.props

    if (track === true && this.watchId === null) {
      this.watchId = location.watch(coordinates => {
        onMove(coordinates)

        this.setState({
          coordinates
        })
      })
    } else if (track === false && this.watchId !== null) {
      location.clearWatch(this.watchId)

      this.watchId = null
    }
  }

  componentWillUnmount() {
    if (this.watchId) {
      location.clearWatch(this.watchId)
    }
  }

  render() {
    const { coordinates } = this.state

    if (!coordinates) {
      return null
    }

    return (
      <MapView.Marker coordinate={coordinates}>
        <View style={styles.marker}>
          <Text style={styles.label}>ME</Text>
        </View>
      </MapView.Marker>
    )
  }
}

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderColor: Colors.user,
    borderRadius: 20,
    borderWidth: 4,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  label: {
    color: Colors.user,
    fontWeight: 'bold'
  }
})
