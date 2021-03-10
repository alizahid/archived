import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { iOSColors } from 'react-native-typography'

interface Props {
  onPress: () => void
}

export const Separator: FunctionComponent = () => <View style={styles.main} />

const styles = StyleSheet.create({
  main: {
    backgroundColor: iOSColors.customGray,
    height: 1
  }
})
