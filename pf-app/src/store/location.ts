import { createIntl } from 'react-intl'
import { Alert, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { Action, createHook, createStore } from 'react-sweet-state'

import { messages } from '../i18n'
import { Location } from '../types'

type State = {
  location?: Location
  loading: boolean
}
type Actions = typeof actions

const initialState: State = {
  loading: false
}

const actions = {
  getLocation: (
    locale: string
  ): Action<State, void, Promise<Location | undefined>> => async ({
    setState
  }) => {
    setState({
      loading: true
    })

    if (Platform.OS === 'ios') {
      const state = await Geolocation.requestAuthorization('whenInUse')

      if (state !== 'granted') {
        setState({
          loading: false
        })

        return
      }
    }

    return new Promise((resolve) =>
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const next: Location = {
            latitude,
            longitude
          }

          setState({
            loading: false,
            location: next
          })

          resolve(next)
        },
        ({ message }) => {
          const i18n = createIntl({
            locale,
            messages: messages[locale]
          })

          Alert.alert(
            i18n.formatMessage({
              id: 'common__error'
            }),
            message
          )

          setState({
            loading: false
          })
        }
      )
    )
  }
}

const store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'location'
})

export const useLocation = createHook(store)
