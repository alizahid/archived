import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { fonts } from '../styles'

const Error: FunctionComponent = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.message}>Something went wrong</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    ...fonts.title
  }
})

export default Error
