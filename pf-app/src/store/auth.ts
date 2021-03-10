import { POSITIONSTACK_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createIntl } from 'react-intl'
import { Alert, I18nManager } from 'react-native'
import Restart from 'react-native-restart'
import { Action, createHook, createStore } from 'react-sweet-state'

import { messages } from '../i18n'
import {
  IpGeocodeResponse,
  Location,
  ReverseGeocodeResponse,
  Themes
} from '../types'

type State = {
  country?: string
  loading: boolean
  locale: string
  locating: boolean
  location?: Location
  theme: Themes
}
type Actions = typeof actions

const initialState: State = {
  loading: true,
  locale: 'en',
  locating: false,
  theme: 'light'
}

const actions = {
  fetchCountryByIp: (callback?: () => void): Action<State> => async ({
    getState,
    setState
  }) => {
    setState({
      locating: true
    })

    try {
      const response = await fetch('http://ip-api.com/json')

      const { country }: IpGeocodeResponse = await response.json()

      const { locale } = getState()

      const i18n = createIntl({
        locale,
        messages: messages[locale]
      })

      Alert.alert(
        i18n.formatMessage({
          id: 'hook__auth__fetchCountry__title'
        }),
        i18n.formatMessage(
          {
            id: 'hook__auth__fetchCountry__message'
          },
          {
            country
          }
        ),
        [
          {
            style: 'cancel',
            text: i18n.formatMessage({
              id: 'common__no'
            })
          },
          {
            onPress: async () => {
              setState({
                country
              })

              callback?.()

              await AsyncStorage.setItem('@country', country)
            },
            text: i18n.formatMessage({
              id: 'common__yes'
            })
          }
        ]
      )
    } finally {
      setState({
        locating: false
      })
    }
  },
  fetchCountryByLocation: (
    location: Location,
    callback?: () => void
  ): Action<State> => async ({ getState, setState }) => {
    setState({
      locating: true
    })

    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${POSITIONSTACK_KEY}&query=${location.latitude},${location.longitude}`
      )

      const json: ReverseGeocodeResponse = await response.json()

      const country = json.data[0].country

      const { locale } = getState()

      const i18n = createIntl({
        locale,
        messages: messages[locale]
      })

      Alert.alert(
        i18n.formatMessage({
          id: 'hook__auth__fetchCountry__title'
        }),
        i18n.formatMessage(
          {
            id: 'hook__auth__fetchCountry__message'
          },
          {
            country
          }
        ),
        [
          {
            style: 'cancel',
            text: i18n.formatMessage({
              id: 'common__no'
            })
          },
          {
            onPress: async () => {
              setState({
                country,
                location
              })

              callback?.()

              await AsyncStorage.setItem('@country', country)
              await AsyncStorage.setItem('@location', JSON.stringify(location))
            },
            text: i18n.formatMessage({
              id: 'common__yes'
            })
          }
        ]
      )
    } finally {
      setState({
        locating: false
      })
    }
  },
  init: (): Action<State> => async ({ setState }) => {
    const country = await AsyncStorage.getItem('@country')
    const locale = await AsyncStorage.getItem('@locale')
    const location = await AsyncStorage.getItem('@location')
    const theme = await AsyncStorage.getItem('@theme')

    if (country) {
      setState({
        country
      })
    }

    if (locale) {
      setState({
        locale
      })
    }

    if (location) {
      setState({
        location: JSON.parse(location)
      })
    }

    if (theme) {
      setState({
        theme: theme as Themes
      })
    }

    setState({
      loading: false
    })
  },
  setCountry: (country: string): Action<State> => async ({ setState }) => {
    setState({
      country
    })

    await AsyncStorage.setItem('@country', country)
  },
  setLocale: (locale: string, rtl: boolean): Action<State> => async ({
    setState
  }) => {
    if (I18nManager.isRTL !== rtl) {
      I18nManager.forceRTL(rtl)

      Restart.Restart()
    }

    setState({
      locale
    })

    await AsyncStorage.setItem('@locale', locale)
  },
  setTheme: (theme: Themes): Action<State> => async ({ setState }) => {
    setState({
      theme
    })

    await AsyncStorage.setItem('@theme', theme)
  },
  signOut: (): Action<State> => async ({ setState }) => {
    setState({
      country: undefined
    })

    await AsyncStorage.removeItem('@country')
  }
}

export const auth = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(auth)
