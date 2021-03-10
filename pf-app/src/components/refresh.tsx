import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { Platform, RefreshControl, RefreshControlProps } from 'react-native'

import { colors } from '../styles'

type Props = Pick<RefreshControlProps, 'refreshing' | 'onRefresh'>

export const Refresh: FunctionComponent<Props> = (props) => {
  const theme = useTheme()

  const color = Platform.select({
    android: colors.primary,
    default: theme.colors.text
  })

  return <RefreshControl {...props} colors={[color]} tintColor={color} />
}
