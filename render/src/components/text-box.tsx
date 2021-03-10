import React, { forwardRef } from 'react'
import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native'

import { colors, fonts, layout } from '../assets'

interface Props {
  style?: TextStyle
}

export const TextBox = forwardRef<TextInput, Props & TextInputProps>(
  ({ style, ...props }, ref) => (
    <TextInput
      ref={ref}
      style={[styles.main, style]}
      placeholderTextColor={colors.foregroundLight}
      underlineColorAndroid="transparent"
      {...props}
    />
  )
)

const styles = StyleSheet.create({
  main: {
    ...fonts.regular,
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    color: colors.foreground,
    height: layout.textBox.height,
    paddingHorizontal: layout.margin * (3 / 4)
  }
})
