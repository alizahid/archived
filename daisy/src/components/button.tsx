import React, { FunctionComponent } from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from 'react-native'

import { colors, layout, sans } from '../styles'
import { Spinner } from './spinner'

interface Props {
  disabled?: boolean
  label: string
  loading?: boolean
  spinnerColor?: string
  style?: StyleProp<ViewStyle>
  styleLabel?: TextStyle

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  label,
  disabled,
  loading,
  onPress,
  spinnerColor = colors.foreground,
  style,
  styleLabel
}) => (
  <Pressable
    disabled={disabled || loading}
    onPress={onPress}
    style={[styles.main, style]}>
    <Text style={[styles.label, styleLabel]}>{label}</Text>
    {loading && <Spinner color={spinnerColor} style={styles.spinner} />}
  </Pressable>
)

const styles = StyleSheet.create({
  label: {
    ...sans.regular,
    ...sans.medium,
    color: colors.foreground
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: layout.radius,
    flexDirection: 'row',
    height: layout.button,
    justifyContent: 'center',
    paddingHorizontal: layout.margin
  },
  spinner: {
    marginLeft: layout.padding
  }
})
