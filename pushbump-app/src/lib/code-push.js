import { CODE_PUSH_KEY_ANDROID, CODE_PUSH_KEY_IOS } from 'react-native-dotenv'

import { Platform } from 'react-native'
import { Sentry } from 'react-native-sentry'
import codePush from 'react-native-code-push'

codePush.getUpdateMetadata().then(update => {
  if (update) {
    Sentry.setVersion(update.appVersion + '-codepush:' + update.label)
  }
})

export default app =>
  codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESUME,
    deploymentKey: Platform.select({
      android: CODE_PUSH_KEY_ANDROID,
      ios: CODE_PUSH_KEY_IOS
    })
  })(app)
