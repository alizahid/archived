import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { BottomTabBarProps } from 'react-navigation-tabs'

import { colors, layout, nav } from '../assets'
import { Touchable } from './touchable'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation: {
    state: { index, routes }
  },
  onTabPress
}) => {
  const { bottom } = useSafeArea()

  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const showHandler = () => {
      setHidden(true)
    }

    const hideHandler = () => {
      setHidden(false)
    }

    Keyboard.addListener('keyboardWillShow', showHandler)
    Keyboard.addListener('keyboardWillHide', hideHandler)

    return () => {
      Keyboard.removeListener('keyboardWillShow', showHandler)
      Keyboard.removeListener('keyboardWillHide', hideHandler)
    }
  }, [])

  if (hidden) {
    return null
  }

  return (
    <View
      style={[
        styles.main,
        {
          marginBottom: bottom
        }
      ]}>
      {routes.map((route, key) => (
        <Touchable
          key={key}
          style={styles.link}
          onPress={() =>
            onTabPress({
              route
            })
          }>
          <Image
            style={styles.icon}
            source={nav[route.routeName][index === key ? 'active' : 'base']}
          />
        </Touchable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    ...layout.icon,
    margin: layout.margin
  },
  link: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: layout.border.width * 2,
    flexDirection: 'row'
  }
})
