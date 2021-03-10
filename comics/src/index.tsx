import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Comic, Home } from './scenes'
import { ComicInterface } from './types'

export type StackParamList = {
  Home: undefined
  Comic: {
    comic: ComicInterface
  }
}

const Stack = createStackNavigator<StackParamList>()

export const Comics: FunctionComponent = () => {
  const isDark = useDarkMode()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            component={Home}
            name="Home"
            options={{
              title: 'Comics'
            }}
          />
          <Stack.Screen
            component={Comic}
            name="Comic"
            options={({ route }) => ({
              title: route.params.comic.name
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
