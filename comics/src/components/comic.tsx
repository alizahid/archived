import React, { FunctionComponent } from 'react'
import { Image, Text } from 'react-native'
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet
} from 'react-native-dark-mode'
import { isTablet } from 'react-native-device-info'

import { useDimensions, useOrientation } from '../hooks'
import { ComicInterface } from '../types'
import { Touchable } from './touchable'

interface Props {
  comic: ComicInterface

  onPress: () => void
}

export const Comic: FunctionComponent<Props> = ({ comic, onPress }) => {
  const { width } = useDimensions()
  const { isLandscape } = useOrientation()

  const imageWidth =
    isTablet() || isLandscape ? (width - 80) / 4 : (width - 60) / 2
  const imageHeight = imageWidth * 1.5
  const maxWidth = isTablet() || isLandscape ? width / 4 - 20 : width / 2 - 30

  const stylesheet = new DynamicStyleSheet({
    image: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      height: imageHeight,
      width: imageWidth
    },
    main: {
      backgroundColor: new DynamicValue('white', '#333'),
      borderRadius: 5,
      elevation: 4,
      flex: 1,
      margin: 10,
      maxWidth,
      shadowColor: 'black',
      shadowOffset: {
        height: 2,
        width: 0
      },
      shadowOpacity: 0.25,
      shadowRadius: 2
    },
    name: {
      color: new DynamicValue('black', 'white'),
      fontSize: 18,
      fontWeight: '500',
      margin: 10
    }
  })

  const styles = useDynamicStyleSheet(stylesheet)

  return (
    <Touchable onPress={onPress} style={styles.main}>
      <Image source={comic.image} style={styles.image} />
      <Text style={styles.name}>{comic.name}</Text>
    </Touchable>
  )
}
