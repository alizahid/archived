import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { getFares, getLines, getStations, getZones } from '../redux/actions'

import { Main, Text } from '../components'
import { Colors, Layout } from '../styles'

import metro from '../assets/metro.png'

class Landing extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const { getFares, getLines, getStations, getZones } = this.props

    getFares()
    getLines()
    getStations()
    getZones()
  }

  componentWillReceiveProps(props) {
    const { fares, lines, stations, zones } = props

    if (fares.data && lines.data && stations.data && zones.data) {
      this.goHome()
    }
  }

  goHome() {
    const { dispatch } = this.props.navigation

    const home = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'app'
        })
      ]
    })

    dispatch(home)
  }

  render() {
    return (
      <Main style={styles.container}>
        <Image style={styles.logo} source={metro} />
        <ActivityIndicator color={Colors.primary} />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 80,
    marginBottom: Layout.margin * 2,
    width: 80
  }
})

const mapStateToProps = state => {
  const { fares, lines, stations, zones } = state

  return {
    fares,
    lines,
    stations,
    zones
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFares: () => dispatch(getFares()),
    getLines: () => dispatch(getLines()),
    getStations: () => dispatch(getStations()),
    getZones: () => dispatch(getZones())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
