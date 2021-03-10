import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { iOSUIKit } from 'react-native-typography'

const NotFound: FunctionComponent = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.error}>Not found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  error: {
    ...iOSUIKit.title3EmphasizedObject
  }
})

export default NotFound
