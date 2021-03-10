import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { HomeNavigator } from './home'
import { ProfileNavigator } from './profile'
import { UserNavigator } from './user'

export type MainParams = {
  Home: undefined
  User: undefined
  Profile: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParams>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator
    tabBarOptions={{
      showLabel: false
    }}>
    <Screen
      component={HomeNavigator}
      name="Home"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon
            color={color}
            name={focused ? 'home' : 'home-outline'}
            size={size}
          />
        )
      }}
    />
    <Screen
      component={UserNavigator}
      name="User"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon
            color={color}
            name={focused ? 'information-circle' : 'information-circle-outline'}
            size={size}
          />
        )
      }}
    />
    <Screen
      component={ProfileNavigator}
      name="Profile"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon
            color={color}
            name={focused ? 'person-circle' : 'person-circle-outline'}
            size={size}
          />
        )
      }}
    />
  </Navigator>
)
