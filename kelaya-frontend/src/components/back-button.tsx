import React, { FunctionComponent } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import { img_left } from '../assets'
import { layout } from '../styles'

interface Props {
  onPress: () => void
}

export const BackButton: FunctionComponent<Props> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <FastImage source={img_left} style={styles.icon} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  }
})
