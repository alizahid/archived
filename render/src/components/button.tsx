import React, { FunctionComponent } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'

import { colors, fonts, layout, weights } from '../assets'
import { Touchable } from './touchable'

interface Props {
  label: string
  loading?: boolean
  style?: ViewStyle
  styleLabel?: TextStyle

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  label,
  loading,
  onPress,
  style,
  styleLabel
}) => {
  const Main = loading ? View : Touchable

  return (
    <Main
      style={[styles.main, style]}
      onPress={() => {
        if (!loading) {
          onPress()
        }
      }}>
      {!loading && <Text style={[styles.label, styleLabel]}>{label}</Text>}
      {loading && <ActivityIndicator color={colors.background} size="small" />}
    </Main>
  )
}

const styles = StyleSheet.create({
  label: {
    ...fonts.regular,
    ...weights.medium,
    color: colors.background,
    fontSize: 16
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: layout.border.radius,
    flexDirection: 'row',
    height: layout.button.height,
    justifyContent: 'center',
    paddingHorizontal: layout.margin
  }
})
