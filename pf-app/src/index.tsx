import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { Platform, StatusBar } from 'react-native'

import { Loading } from './components/loading'
import { messages } from './i18n'
import { MainNavigator } from './navigators/main'
import { useAuth } from './store/auth'
import { themes } from './styles'

export const Corona: FunctionComponent = () => {
  const [{ loading, locale, theme }, { init }] = useAuth()

  useEffect(() => {
    init()
  }, [init])

  if (loading) {
    return <Loading />
  }

  const linking: LinkingOptions = {
    config: {
      screens: {
        Home: 'home',
        Profile: {
          initialRouteName: 'Profile',
          screens: {
            IP: 'location/ip',
            List: 'location/list',
            Map: 'location/map',
            Profile: 'profile'
          }
        },
        User: 'user'
      }
    },
    prefixes: ['corona://']
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <NavigationContainer linking={linking} theme={themes[theme]}>
        <StatusBar
          barStyle={
            Platform.OS === 'ios'
              ? themes[theme].dark
                ? 'light-content'
                : 'dark-content'
              : 'light-content'
          }
        />
        <MainNavigator />
      </NavigationContainer>
    </IntlProvider>
  )
}
