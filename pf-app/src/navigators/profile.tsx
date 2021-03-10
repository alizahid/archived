import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { Dimensions } from 'react-native'

import { HeaderButton } from '../components/header'
import { IpScene } from '../scenes/profile/ip'
import { ListScene } from '../scenes/profile/list'
import { MapScene } from '../scenes/profile/map'
import { ProfileScene } from '../scenes/profile/profile'
import { headerTitleStyle } from '../styles'

export type ProfileParams = {
  Profile: undefined
  IP: undefined
  List: undefined
  Map: undefined
}

const { Navigator, Screen } = createStackNavigator<ProfileParams>()

const { width } = Dimensions.get('window')

export const ProfileNavigator: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <Navigator
      screenOptions={{
        gestureResponseDistance: {
          horizontal: width
        },
        headerBackImage: () => <HeaderButton icon="arrow-back" />,
        headerBackTitleVisible: false,
        headerTitleStyle
      }}>
      <Screen
        component={ProfileScene}
        name="Profile"
        options={{
          title: formatMessage({
            id: 'screen__profile__title'
          })
        }}
      />
      <Screen
        component={MapScene}
        name="Map"
        options={{
          gestureResponseDistance: {
            horizontal: width * 0.2
          },
          title: formatMessage({
            id: 'screen__profile__map__title'
          })
        }}
      />
      <Screen
        component={IpScene}
        name="IP"
        options={{
          title: formatMessage({
            id: 'screen__profile__ip__title'
          })
        }}
      />
      <Screen
        component={ListScene}
        name="List"
        options={{
          title: formatMessage({
            id: 'screen__profile__list__title'
          })
        }}
      />
    </Navigator>
  )
}
