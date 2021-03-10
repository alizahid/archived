import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import { capitalize } from 'lodash'

import { Hero } from './'

@inject('store')
@observer
export default class Heroes extends Component {
  onPick(index, side, hero) {
    const { store } = this.props

    store.setPick(index, side, hero)
  }

  renderItem = hero => {
    const { side } = this.props
    const { index } = hero

    return (
      <Hero
        key={index}
        hero={hero}
        onPick={hero => this.onPick(index, side, hero)}
      />
    )
  }

  render() {
    const { side, store } = this.props

    const heroes = side === 'enemy' ? store.enemyPicks : store.yourPicks

    return (
      <View style={[styles.container, styles[side]]}>
        <Text style={styles.side}>{capitalize(side)}</Text>
        {heroes.map(this.renderItem)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10
  },
  side: {
    color: '#7eb0d6',
    fontSize: 20
  },
  picks: {
    color: 'white',
    marginLeft: 10
  },
  enemy: {
    alignItems: 'flex-start'
  },
  you: {
    alignItems: 'flex-end'
  }
})
