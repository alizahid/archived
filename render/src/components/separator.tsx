import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import { colors, layout } from '../assets'

export const Separator: FunctionComponent = () => <View style={styles.main} />

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.border,
    height: layout.border.width
  }
})
