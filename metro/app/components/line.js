import React, { Component } from 'react'
import { MapView } from 'expo'

export default class Line extends Component {
  render() {
    const { coordinates, color } = this.props

    return (
      <MapView.Polyline
        coordinates={coordinates}
        strokeColor={color}
        strokeWidth={4}
      />
    )
  }
}
