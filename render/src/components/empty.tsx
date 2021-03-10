import React, { FunctionComponent } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'

import { fonts } from '../assets'

interface Props {
  message: string
  style?: StyleProp<ViewStyle>
  styleLabel?: StyleProp<TextStyle>
}

export const Empty: FunctionComponent<Props> = ({
  message,
  style,
  styleLabel
}) => (
  <View style={[styles.main, style]}>
    <Text style={[styles.message, styleLabel]}>{message}</Text>
  </View>
)

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    ...fonts.regular
  }
})
