import React, { FunctionComponent } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_background } from '../assets'

interface Props {
  style?: ViewStyle
}

export const Container: FunctionComponent<Props> = ({ children, style }) => {
  const { bottom, top } = useSafeArea()

  return (
    <FastImage
      source={img_background}
      style={[
        styles.main,
        {
          paddingBottom: bottom,
          paddingTop: top
        },
        style
      ]}>
      {children}
    </FastImage>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
