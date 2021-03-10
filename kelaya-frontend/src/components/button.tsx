import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { iOSColors, iOSUIKit } from 'react-native-typography'

import { colors, layout } from '../styles'

interface Props {
  disabled?: boolean
  label: string
  style?: ViewStyle

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  disabled,
  label,
  onPress,
  style
}) => (
  <TouchableOpacity
    onPress={() => {
      if (!disabled) {
        onPress()
      }
    }}
    style={[styles.main, disabled && styles.disabled, style]}>
    <Text style={[styles.label, disabled && styles.disabledLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: iOSColors.lightGray2
  },
  disabledLabel: {
    color: iOSColors.gray
  },
  label: {
    ...iOSUIKit.bodyObject
  },
  main: {
    backgroundColor: colors.primary,
    borderRadius: layout.radius,
    padding: layout.margin * 0.75
  }
})
