import React, { FunctionComponent } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

import { img_daisy } from '../assets'
import { colors, layout } from '../styles'

export const Loading: FunctionComponent = () => (
  <View style={styles.main}>
    <Image source={img_daisy} style={styles.logo} />
    <ActivityIndicator color={colors.accent} />
  </View>
)

const styles = StyleSheet.create({
  logo: {
    height: layout.hero,
    marginBottom: layout.margin * 2,
    width: layout.hero
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
