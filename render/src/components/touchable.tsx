import React, { FunctionComponent } from 'react'
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { colors } from '../assets'

interface Props {
  highlight?: boolean
  style?: ViewStyle | (ViewStyle | undefined | false)[]

  onPress: () => void
}

export const Touchable: FunctionComponent<Props> = ({
  children,
  highlight,
  onPress,
  style
}) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  }

  if (highlight) {
    return (
      <TouchableHighlight
        style={style}
        onPress={onPress}
        underlayColor={colors.backgroundDark}>
        <>{children}</>
      </TouchableHighlight>
    )
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}
