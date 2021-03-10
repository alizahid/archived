import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { I18nManager, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { layout, rtl, typography } from '../styles'

export type MenuItemProps = {
  forward?: boolean
  icon?: string
  key: string
  label: string

  onPress?: () => void
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  forward,
  icon,
  label,
  onPress
}) => {
  const theme = useTheme()

  const Main = onPress ? Pressable : View

  const styles = StyleSheet.create({
    forward: {
      marginLeft: layout.padding,
      opacity: 0.25
    },
    icon: {
      marginRight: layout.padding
    },
    label: {
      ...typography.regular,
      color: theme.colors.text,
      flex: 1,
      textAlign: 'left'
    },
    main: {
      alignItems: 'center',
      borderTopColor: theme.colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      padding: layout.margin
    }
  })

  return (
    <Main onPress={onPress} style={styles.main}>
      {!!icon && (
        <Icon
          color={theme.colors.text}
          name={icon}
          size={layout.icon}
          style={styles.icon}
        />
      )}
      <Text style={styles.label}>{label}</Text>
      {forward && (
        <Icon
          color={theme.colors.text}
          name="chevron-forward"
          size={layout.icon}
          style={[styles.forward, I18nManager.isRTL && rtl.image]}
        />
      )}
    </Main>
  )
}

export type MenuHeaderProps = {
  title: string
  description: string
}

export const MenuHeader: FunctionComponent<MenuHeaderProps> = ({
  description,
  title
}) => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    description: {
      ...typography.small,
      color: theme.colors.text,
      marginTop: layout.padding,
      opacity: 0.75,
      textAlign: 'left'
    },
    main: {
      padding: layout.margin
    },
    title: {
      ...typography.title,
      color: theme.colors.text,
      textAlign: 'left'
    }
  })

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}
