import React, { FunctionComponent } from 'react'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'

import { colors } from '../styles'

interface Props {
  color?: string
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
}

export const Spinner: FunctionComponent<Props> = ({
  color,
  size = 'small',
  style
}) => (
  <ActivityIndicator
    color={color ?? colors.primary}
    size={size}
    style={style}
  />
)
