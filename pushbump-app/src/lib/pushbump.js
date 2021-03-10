import { NativeModules } from 'react-native'

export default class PushBump {
  static hasAccess() {
    return NativeModules.PushBump.hasAccess()
  }

  static requestAccess() {
    NativeModules.PushBump.requestAccess()
  }
}
