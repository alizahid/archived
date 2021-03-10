import 'react-native-gesture-handler'

import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'
import { SENTRY_DSN } from 'react-native-dotenv'

import Render from './src'

Sentry.init({
  dsn: SENTRY_DSN
})

AppRegistry.registerComponent('Render', () => Render)
