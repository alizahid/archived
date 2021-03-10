import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { Main, NavBar, Spinner, Text } from '../components'
import { Colors, Layout } from '../styles'

import card_gold from '../assets/card_gold.png'
import card_silver from '../assets/card_silver.png'
import ticket_red from '../assets/ticket_red.png'

class FaresOther extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tram & Monorail fares',
    header: () => (
      <NavBar
        title="Tram & Monorail fares"
        back={() => navigation.goBack(null)}
      />
    )
  })

  render() {
    const { fares } = this.props

    if (!fares.tram || !fares.monorail) {
      return <Spinner />
    }

    return (
      <Main style={styles.container} scroll={true}>
        <Text style={styles.label}>Tram</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={card_silver} />
            <Text>Silver</Text>
          </View>
          <Text>AED {fares.tram.silver}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={card_gold} />
            <Text>Gold</Text>
          </View>
          <Text>AED {fares.tram.gold}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={ticket_red} />
            <Text>Red</Text>
          </View>
          <Text>AED {fares.tram.red}</Text>
        </View>
        <View style={styles.separator} />
        <Text style={styles.label}>Monorail</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>One-way</Text>
          </View>
          <Text>AED {fares.monorail.one}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Return</Text>
          </View>
          <Text>AED {fares.monorail.return}</Text>
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.margin
  },
  label: {
    fontWeight: '600',
    marginBottom: Layout.padding
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Layout.padding
  },
  highlight: {
    backgroundColor: Colors.backgroundLight
  },
  column: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    height: 20,
    marginRight: 5,
    width: 20
  },
  separator: {
    height: Layout.margin
  }
})

const mapStateToProps = state => {
  const { fares } = state

  return {
    fares: fares.data
  }
}

export default connect(mapStateToProps)(FaresOther)
