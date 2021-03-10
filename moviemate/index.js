import { SENTRY_DSN } from 'react-native-dotenv'

import { AppRegistry } from 'react-native'
import { Sentry } from 'react-native-sentry'
import codePush from 'react-native-code-push'

import MovieMate from './src'

codePush.getUpdateMetadata().then(update => {
  if (update) {
    Sentry.setVersion(update.appVersion + '-codepush:' + update.label)
  }
})

Sentry.config(SENTRY_DSN).install()

AppRegistry.registerComponent('MovieMate', () => MovieMate)
