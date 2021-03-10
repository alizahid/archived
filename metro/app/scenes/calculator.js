import React, { Component } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { getFares } from '../redux/actions'

import { Button, Dropdown, Main, NavBar, Spinner } from '../components'
import { Colors, Fonts, Layout } from '../styles'

class Calculator extends Component {
  static navigationOptions = {
    title: 'Fare calculator',
    header: () => <NavBar title="Fare calculator" />
  }

  state = {
    one: 1,
    two: 2
  }

  componentDidMount() {
    const { getFares } = this.props

    getFares()
  }

  setSelection(which, id) {
    const { one, two } = this.state

    if ((which === 'one' && two !== id) || (which === 'two' && one !== id)) {
      this.setState({
        [which]: id
      })

      return true
    }
  }

  calculateFare = () => {
    const { one, two } = this.state
    const { navigation } = this.props

    navigation.navigate('fares', {
      one,
      two
    })
  }

  render() {
    const { one, two } = this.state
    const { loading, navigation, stations } = this.props

    if (loading) {
      return <Spinner />
    }

    return (
      <Main style={styles.container}>
        <Main style={styles.content} scroll={true}>
          <Dropdown
            data={stations}
            label="From"
            setSelection={id => this.setSelection('one', id)}
            value={one}
          />
          <Dropdown
            style={styles.dropdown}
            data={stations}
            label="To"
            setSelection={id => this.setSelection('two', id)}
            value={two}
          />
        </Main>
        <View>
          <Button
            style={styles.dropdown}
            label="Calculate"
            onPress={this.calculateFare}
          />
          <Button
            style={styles.dropdown}
            label="View Tram & Monorail fares"
            onPress={() => navigation.navigate('other')}
          />
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.margin
  },
  content: {
    flex: 1
  },
  dropdown: {
    marginTop: Layout.margin
  }
})

const mapStateToProps = state => {
  const { data, loading } = state.stations

  const stations = data
    .filter(station => station.type === 'metro')
    .map(({ key, id: value, name: label, zone }) => ({
      key,
      label,
      value,
      zone
    }))

  return {
    loading,
    stations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFares: () => dispatch(getFares())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
