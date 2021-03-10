import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, layout } from '../styles'

interface Props {
  label: string
  style?: any

  onPress?: any
}

const TextBox: FunctionComponent<Props> = ({ label, style, onPress }) => {
  return (
    <View style={[styles.main, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.primary,
    borderRadius: layout.border.radius
  },
  label: {
    alignSelf: 'center',
    color: colors.background,
    lineHeight: layout.button.size,
    paddingHorizontal: layout.margin
  }
})

export default TextBox
