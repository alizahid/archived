import { useTheme } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { I18nManager, Platform, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { layout, rtl } from '../styles'
import { Spinner } from './spinner'

type Props = {
  loading?: boolean
  icon: string

  onPress?: () => void
}

export const HeaderButton: FunctionComponent<Props> = ({
  icon,
  loading,
  onPress
}) => {
  const theme = useTheme()

  const height = Platform.select({
    android: 40,
    default: 50
  })

  const styles = StyleSheet.create({
    main: {
      alignItems: 'center',
      height,
      justifyContent: 'center',
      width: height
    }
  })

  if (onPress) {
    return (
      <HeaderBackButton
        backImage={() => (
          <Icon color={theme.colors.text} name={icon} size={layout.icon} />
        )}
        labelVisible={false}
        onPress={onPress}
        style={styles.main}
      />
    )
  }

  if (loading) {
    return (
      <View style={styles.main}>
        <Spinner />
      </View>
    )
  }

  return (
    <View style={styles.main}>
      <Icon
        color={theme.colors.text}
        name={icon}
        size={layout.icon}
        style={I18nManager.isRTL && rtl.image}
      />
    </View>
  )
}
