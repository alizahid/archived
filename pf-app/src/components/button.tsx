import React, { FunctionComponent } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle
} from 'react-native'

import { colors, layout, typefaces, typography } from '../styles'

type Props = {
  label: string
  loading?: boolean
  style?: StyleProp<ViewStyle>

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  label,
  loading,
  onPress,
  style
}) => (
  <Pressable onPress={onPress} style={[styles.main, style]}>
    <Text style={styles.label}>{label}</Text>
    {loading && (
      <ActivityIndicator color={colors.background} style={styles.spinner} />
    )}
  </Pressable>
)

const styles = StyleSheet.create({
  label: {
    ...typography.regular,
    color: colors.background,
    fontFamily: typefaces.inter.medium
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: layout.radius,
    flexDirection: 'row',
    height: layout.button,
    paddingHorizontal: layout.margin
  },
  spinner: {
    marginLeft: layout.padding
  }
})
