import { SENTRY_DSN } from 'react-native-dotenv'

import { AppRegistry } from 'react-native'
import { Sentry } from 'react-native-sentry'

import PushBump from './src'
import Worker from './src/worker'

Sentry.config(SENTRY_DSN).install()

AppRegistry.registerComponent('PushBump', () => PushBump)
AppRegistry.registerHeadlessTask('PushBumpWorker', () => Worker)
