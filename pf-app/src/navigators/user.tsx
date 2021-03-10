import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { UserScene } from '../scenes/user'
import { useAuth } from '../store/auth'
import { headerTitleStyle } from '../styles'

export type UserParams = {
  User: undefined
}

const { Navigator, Screen } = createStackNavigator<UserParams>()

export const UserNavigator: FunctionComponent = () => {
  const [{ country }] = useAuth()

  return (
    <Navigator
      screenOptions={{
        headerTitleStyle
      }}>
      <Screen
        component={UserScene}
        name="User"
        options={{
          title: country
        }}
      />
    </Navigator>
  )
}
