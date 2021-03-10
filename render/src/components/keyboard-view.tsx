import React, { FunctionComponent } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

export const KeyboardView: FunctionComponent = ({ children }) => (
  <KeyboardAvoidingView
    style={styles.main}
    behavior="padding"
    enabled={Platform.OS === 'ios'}>
    {children}
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
