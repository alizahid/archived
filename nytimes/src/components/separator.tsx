import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { iOSColors } from 'react-native-typography'

const Separator: FunctionComponent = () => {
  return <View style={styles.main} />
}

const styles = StyleSheet.create({
  main: {
    borderTopColor: iOSColors.customGray,
    borderTopWidth: 1
  }
})

export default Separator
