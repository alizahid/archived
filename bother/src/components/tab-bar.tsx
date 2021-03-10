import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView, BottomTabBarProps } from 'react-navigation'

import {
  black_chat,
  black_create,
  black_feed,
  black_search,
  black_settings,
  pink_chat,
  pink_create,
  pink_feed,
  pink_search,
  pink_settings
} from '../assets'
import { colors, layout, shadow } from '../styles'

const icons: any = {
  Feed: black_feed,
  Search: black_search,
  Create: black_create,
  Conversations: black_chat,
  Settings: black_settings
}

const active: any = {
  Feed: pink_feed,
  Search: pink_search,
  Create: pink_create,
  Conversations: pink_chat,
  Settings: pink_settings
}

const TabBar: FunctionComponent<BottomTabBarProps> = ({
  // @ts-ignore
  onTabPress,
  navigation: {
    state: { index, routes }
  }
}) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setHidden(true))
    Keyboard.addListener('keyboardWillHide', () => setHidden(false))

    return () => {
      if (Keyboard.listeners.length > 0) {
        Keyboard.removeAllListeners()
      }
    }
  }, [])

  if (hidden) {
    return null
  }

  return (
    <SafeAreaView style={styles.main}>
      {routes.map((route, current) => (
        <TouchableOpacity
          style={styles.link}
          key={current}
          onPress={() =>
            onTabPress({
              route
            })
          }
        >
          <Image
            style={styles.icon}
            source={current === index ? active[route.key] : icons[route.key]}
          />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    ...shadow,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  link: {
    alignItems: 'center',
    flex: 1,
    padding: layout.margin
  },
  icon: {
    height: layout.icon.large,
    width: layout.icon.large
  }
})

export default TabBar
