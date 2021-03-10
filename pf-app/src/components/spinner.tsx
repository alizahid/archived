import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

type Props = Pick<ActivityIndicatorProps, 'color' | 'size' | 'style'>

export const Spinner: FunctionComponent<Props> = (props) => {
  const theme = useTheme()

  return <ActivityIndicator color={theme.colors.text} {...props} />
}
