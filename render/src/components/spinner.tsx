import React, { FunctionComponent } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { colors, layout } from '../assets'

interface Props {
  size?: 'small' | 'large'
  type?: 'bare' | 'full'
}

export const Spinner: FunctionComponent<Props> = ({
  size = 'large',
  type = 'full'
}) => {
  if (type === 'bare') {
    return (
      <ActivityIndicator
        style={styles.bare}
        size={size}
        color={colors.primary}
      />
    )
  }

  return (
    <View style={styles.main}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  bare: {
    margin: layout.margin
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
