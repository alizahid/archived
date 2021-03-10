import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'

import { AppRegistry, I18nManager } from 'react-native'

import { name } from './app.json'
import { Corona } from './src'

I18nManager.allowRTL(true)

AppRegistry.registerComponent(name, () => Corona)
