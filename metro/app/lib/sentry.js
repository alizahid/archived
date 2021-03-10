import { SENTRY_DSN } from 'react-native-dotenv'

import Sentry from 'sentry-expo'

export default {
  init() {
    if (__DEV__) {
      return
    }

    Sentry.config(SENTRY_DSN).install()
  },
  log(message) {
    if (__DEV__) {
      return
    }

    Sentry.captureMessage(message, {
      level: SentrySeverity.Info
    })
  },
  report(error) {
    if (__DEV__) {
      return
    }

    Sentry.captureException(error)
  }
}
