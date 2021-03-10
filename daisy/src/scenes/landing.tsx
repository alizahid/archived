import React, { FunctionComponent, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

import { img_daisy } from '../assets'
import { Button, TextBox } from '../components'
import { firebase } from '../lib'
import { colors, layout, sans } from '../styles'

export const Landing: FunctionComponent = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [error, setError] = useState<string>()
  const [signingIn, setSigningIn] = useState(false)
  const [signingUp, setSigningUp] = useState(false)

  const passwordRef = useRef<TextInput>(null)

  const signIn = async () => {
    if (!email || !password) {
      return
    }

    setError(undefined)
    setSigningIn(true)

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      setError(error.message)
      setSigningIn(false)
    }
  }

  const signUp = async () => {
    if (!email || !password) {
      return
    }

    setError(undefined)
    setSigningUp(true)

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      setError(error.message)
      setSigningUp(false)
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image source={img_daisy} style={styles.logo} />
        <Text style={styles.title}>Daisy</Text>
      </View>
      {!!error && (
        <View style={styles.error}>
          <Text style={styles.message}>{error}</Text>
        </View>
      )}
      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(email) => setEmail(email)}
        onSubmitEditing={() => passwordRef.current?.focus()}
        placeholder="Email"
        returnKeyType="next"
        value={email}
      />
      <TextBox
        onChangeText={(password) => setPassword(password)}
        onSubmitEditing={signIn}
        placeholder="Password"
        ref={passwordRef}
        returnKeyType="go"
        secureTextEntry
        style={styles.item}
        value={password}
      />
      <View style={styles.footer}>
        <Button
          disabled={signingUp}
          label="Sign in"
          loading={signingIn}
          onPress={signIn}
          style={styles.signIn}
        />
        <Button
          disabled={signingIn}
          label="Sign up"
          loading={signingUp}
          onPress={signUp}
          style={styles.signUp}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: colors.state.light.error,
    borderRadius: layout.radius,
    marginBottom: layout.margin,
    padding: layout.margin
  },
  footer: {
    flexDirection: 'row',
    marginTop: layout.margin
  },
  header: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: layout.margin * 2
  },
  item: {
    marginTop: layout.margin
  },
  logo: {
    height: layout.hero / 2,
    width: layout.hero / 2
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  message: {
    ...sans.regular,
    color: colors.foreground
  },
  signIn: {
    flex: 1
  },
  signUp: {
    backgroundColor: colors.accent,
    flex: 1,
    marginLeft: layout.margin
  },
  title: {
    ...sans.title,
    marginLeft: layout.margin
  }
})
