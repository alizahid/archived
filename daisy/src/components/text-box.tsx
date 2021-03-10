import React, { forwardRef } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { colors, layout, lineHeight, sans } from '../styles'

export const TextBox = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => (
    <TextInput
      placeholderTextColor={colors.foregroundLight}
      ref={ref}
      style={[styles.textBox, props.multiline && styles.multiline, style]}
      textAlignVertical={props.multiline ? 'top' : 'center'}
      {...props}
    />
  )
)

const styles = StyleSheet.create({
  multiline: {
    height: layout.textBox * 2,
    lineHeight: lineHeight(sans.regular.fontSize),
    paddingBottom: layout.margin,
    paddingTop: layout.margin
  },
  textBox: {
    ...sans.regular,
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.radius,
    color: colors.foreground,
    height: layout.textBox,
    paddingBottom: 0,
    paddingHorizontal: layout.margin,
    paddingTop: 0
  }
})
