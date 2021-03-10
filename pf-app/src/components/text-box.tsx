import { useTheme } from '@react-navigation/native'
import color from 'color'
import React, { forwardRef } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { layout, typography } from '../styles'

export const TextBox = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    const theme = useTheme()

    const styles = StyleSheet.create({
      textBox: {
        ...typography.regular,
        color: theme.colors.text,
        height: layout.textBox,
        paddingBottom: 0,
        paddingHorizontal: layout.margin,
        paddingTop: 0,
        textAlign: 'left'
      }
    })

    return (
      <TextInput
        ref={ref}
        {...props}
        placeholderTextColor={color(theme.colors.text).lightness(75).hex()}
        style={[styles.textBox, style]}
        textAlignVertical="center"
      />
    )
  }
)
