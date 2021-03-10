import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import star from '../assets/star.png'
import sword from '../assets/sword.png'

export default class Avatar extends Component {
  render() {
    const { id, size, counter, important } = this.props

    const icons = counter || important

    return (
      <View>
        {id && (
          <Image
            style={[styles.avatar, counter && styles.counter, styles[size]]}
            source={{
              uri: `http://cdn.dota2.com/apps/dota2/images/heroes/${id}_full.png`
            }}
          />
        )}
        {!id && <View style={styles[size]} />}
        {icons && (
          <View style={styles.icons}>
            {counter && <Image style={styles.icon} source={sword} />}
            {important && <Image style={styles.icon} source={star} />}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    resizeMode: Image.resizeMode.cover
  },
  counter: {
    opacity: 0.5
  },
  large: {
    height: 56,
    width: 100
  },
  small: {
    height: 28,
    width: 50
  },
  icons: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    justifyContent: 'space-between',
    padding: 5,
    position: 'absolute',
    right: '100%',
    top: 0
  },
  icon: {
    height: 20,
    width: 20
  }
})
