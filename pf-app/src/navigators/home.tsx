import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'

import { HomeScene } from '../scenes/home'
import { headerTitleStyle } from '../styles'

export type HomeParams = {
  Home: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeParams>()

export const HomeNavigator: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <Navigator
      screenOptions={{
        headerTitleStyle
      }}>
      <Screen
        component={HomeScene}
        name="Home"
        options={{
          title: formatMessage({
            id: 'screen__home__title'
          })
        }}
      />
    </Navigator>
  )
}
