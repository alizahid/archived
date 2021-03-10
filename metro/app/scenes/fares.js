import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { Main, NavBar, Spinner, Text } from '../components'
import { Colors, Layout } from '../styles'

import card_blue from '../assets/card_blue.png'
import card_gold from '../assets/card_gold.png'
import card_silver from '../assets/card_silver.png'
import ticket_red from '../assets/ticket_red.png'

import class_gold from '../assets/class_gold.png'
import class_standard from '../assets/class_standard.png'

class Fares extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Fare calculator',
    header: () => (
      <NavBar title="Fare calculator" back={() => navigation.goBack(null)} />
    )
  })

  render() {
    const { count, fares, one, tier, two } = this.props

    if (!fares.metro) {
      return <Spinner />
    }

    return (
      <Main style={styles.container} scroll={true}>
        <View style={styles.line}>
          <Text style={styles.strong}>From</Text>
          <Text style={styles.value}>{one.name}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.strong}>To</Text>
          <Text style={styles.value}>{two.name}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.strong}>Zones</Text>
          <Text style={styles.value}>{count}</Text>
        </View>
        <Text style={styles.title}>Fare</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={card_silver} />
            <Text>Silver</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.icon} source={class_standard} />
            <Text>Standard</Text>
          </View>
          <Text style={styles.tier}>
            AED {fares.metro.standard.silver[tier]}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={card_gold} />
            <Text>Gold</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.icon} source={class_gold} />
            <Text>Gold</Text>
          </View>
          <Text style={styles.tier}>AED {fares.metro.gold.gold[tier]}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={card_blue} />
            <Text>Blue</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.icon} source={class_standard} />
            <Text>Standard</Text>
          </View>
          <Text style={styles.tier}>AED {fares.metro.standard.blue[tier]}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={card_blue} />
            <Text>Blue</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.icon} source={class_gold} />
            <Text>Gold</Text>
          </View>
          <Text style={styles.tier}>AED {fares.metro.gold.blue[tier]}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Image style={styles.icon} source={ticket_red} />
            <Text>Red</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.icon} source={class_standard} />
            <Text>Standard</Text>
          </View>
          <Text style={styles.tier}>AED {fares.metro.standard.red[tier]}</Text>
        </View>
        <View style={[styles.row, styles.rowLast]}>
          <View style={styles.column}>
            <Image style={styles.icon} source={ticket_red} />
            <Text>Red</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.icon} source={class_gold} />
            <Text>Gold</Text>
          </View>
          <Text style={styles.tier}>AED {fares.metro.gold.red[tier]}</Text>
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.margin
  },
  line: {
    flexDirection: 'row',
    marginBottom: Layout.padding
  },
  strong: {
    flex: 1,
    fontWeight: '600'
  },
  value: {
    flex: 3
  },
  title: {
    fontWeight: '600',
    marginTop: Layout.margin
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Layout.padding
  },
  highlight: {
    backgroundColor: Colors.backgroundLight
  },
  column: {
    alignItems: 'center',
    flex: 2,
    flexDirection: 'row'
  },
  tier: {
    flex: 1,
    textAlign: 'right'
  },
  icon: {
    height: 20,
    marginRight: Layout.padding,
    width: 20
  }
})

const mapStateToProps = (state, props) => {
  const { fares, stations, zones } = state

  const { params } = props.navigation.state

  const one = stations.data.find(station => station.id === params.one)
  const two = stations.data.find(station => station.id === params.two)

  const start = zones.data.find(zone => zone.number === one.zone)

  let tier
  let count

  if (one.zone === two.zone) {
    tier = 'one'
    count = 1
  } else if (start.two.indexOf(two.zone) >= 0) {
    tier = 'two'
    count = 2
  } else if (start.three.indexOf(two.zone) >= 0) {
    tier = 'three'
    count = 3
  }

  return {
    one,
    two,
    tier,
    count,
    fares: fares.data
  }
}

export default connect(mapStateToProps)(Fares)
