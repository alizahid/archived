import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import {
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'

import { Button, Loading } from './components'
import { firebase } from './lib'
import { Landing } from './scenes'

export const Daisy: FunctionComponent = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Poppins_500Medium,
    Poppins_600SemiBold
  })

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading || !fontsLoaded) {
    return <Loading />
  }

  if (!user) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.main}>
        <Landing />
      </KeyboardAvoidingView>
    )
  }

  return (
    <View style={styles.content}>
      <Button label="Sign out" onPress={() => firebase.auth().signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    flex: 1
  }
})
