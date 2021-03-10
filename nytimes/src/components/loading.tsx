import React, { FunctionComponent } from 'react'
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native'
import { iOSColors } from 'react-native-typography'

import { layout } from '../styles'

const Loading: FunctionComponent = () => {
  if (Platform.OS === 'android') {
    return null
  }

  return (
    <View style={styles.main}>
      <ActivityIndicator color={iOSColors.green} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: layout.margin
  }
})

export default Loading
