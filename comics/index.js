import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'

import { name as appName } from './app.json'
import { Comics } from './src'

AppRegistry.registerComponent(appName, () => Comics)
