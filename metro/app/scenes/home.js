import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'expo'

import { getLines, getStations, getZones } from '../redux/actions'

import {
  Details,
  Line,
  Main,
  SearchBar,
  Station,
  Tracker,
  User
} from '../components'
import { location } from '../lib'

class Home extends Component {
  static navigationOptions = {
    title: 'Metro',
    header: null
  }

  state = {
    track: false,
    stations: [],
    region: {
      latitude: 25.2048,
      longitude: 55.2708,
      latitudeDelta: 0.25,
      longitudeDelta: 0.25
    }
  }

  componentDidMount() {
    const { getLines, getStations, getZones } = this.props

    getLines()
    getStations()
    getZones()
  }

  componentWillReceiveProps(props) {
    const { stations } = props

    this.setState({
      stations
    })
  }

  onQuery = query => {
    const { stations } = this.props

    const data = stations.filter(
      ({ area, name }) =>
        (area && area.toLowerCase().indexOf(query.toLowerCase()) >= 0) ||
        name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    )

    this.setState({
      stations: data
    })
  }

  showDetails = (event, station) => {
    event.stopPropagation()

    const { details, track } = this.state

    if (details === station) {
      return
    }

    this.setState({
      details: station
    })

    if (!track) {
      this.refs.map.animateToRegion({
        ...station.coordinates,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      })
    }
  }

  hideDetails = () => {
    const { details } = this.state

    if (details === null) {
      return
    }

    this.setState({
      details: null
    })
  }

  onMove = coordinates => {
    const { stations } = this.state

    const nearest = location.getNearestStation(stations, coordinates)

    this.setState({
      nearest
    })

    this.refs.map.animateToRegion({
      ...coordinates,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
  }

  onChange = track => {
    this.setState({
      track
    })
  }

  render() {
    const { lines } = this.props
    const { details, track, nearest, region, stations } = this.state

    return (
      <Main>
        <MapView
          ref="map"
          style={styles.map}
          initialRegion={region}
          rotateEnabled={!track}
          scrollEnabled={!track}
          showsBuildings={false}
          showsIndoors={false}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          toolbarEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={!track}
        >
          {stations.map(station => (
            <Station
              key={station.key}
              {...station}
              onPress={event => this.showDetails(event, station)}
            />
          ))}
          {lines.map(line => <Line key={line.id} {...line} />)}
          <User track={track} onMove={this.onMove} />
        </MapView>
        {details && <Details {...details} onClose={this.hideDetails} />}
        <SearchBar onQuery={this.onQuery} />
        <Tracker track={track} nearest={nearest} onChange={this.onChange} />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

const mapStateToProps = state => {
  const { lines, stations } = state

  return {
    lines: lines.data,
    stations: stations.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLines: () => dispatch(getLines()),
    getStations: () => dispatch(getStations()),
    getZones: () => dispatch(getZones())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
