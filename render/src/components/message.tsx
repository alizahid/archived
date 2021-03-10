import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'

import { colors, fonts, layout } from '../assets'

interface Props {
  label: string
  style?: TextStyle
  type: 'error' | 'message' | 'success' | 'warning'
}

export const Message: FunctionComponent<Props> = ({ label, style, type }) => (
  <View style={[styles.main, style]}>
    <Text
      style={[
        styles.label,
        type === 'error' && styles.error,
        type === 'message' && styles.message,
        type === 'success' && styles.success,
        type === 'warning' && styles.warning
      ]}>
      {label}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  error: {
    backgroundColor: colors.state.error,
    color: colors.background
  },
  label: {
    ...fonts.regular,
    padding: layout.margin * (2 / 3)
  },
  main: {
    borderRadius: layout.border.radius,
    overflow: 'hidden'
  },
  message: {
    backgroundColor: colors.state.message,
    color: colors.background
  },
  success: {
    backgroundColor: colors.state.success,
    color: colors.foreground
  },
  warning: {
    backgroundColor: colors.state.warning,
    color: colors.foreground
  }
})
