import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '../styles'

interface Props {
  dark?: boolean
}

const Separator: FunctionComponent<Props> = ({ dark }) => {
  return <View style={[styles.main, dark && styles.dark]} />
}

const styles = StyleSheet.create({
  main: {
    borderTopColor: colors.border,
    borderTopWidth: 1
  },
  dark: {
    borderTopColor: colors.borderDark
  }
})

export default Separator
