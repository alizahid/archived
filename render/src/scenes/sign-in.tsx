import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { layout } from '../assets'
import { Button, Message, NavBar, TextBox } from '../components'
import {
  IAuthResult,
  IMutationSignInArgs,
  IMutationVerifyOtpArgs
} from '../graphql/types'
import { dialog } from '../lib'
import { useAuth } from '../store'

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ...authResultFields
      __typename
    }
  }

  fragment authResultFields on AuthResult {
    idToken
    user {
      ...userFields
      __typename
    }
    __typename
  }

  fragment userFields on User {
    id
    email
    otpEnabled
    __typename
  }
`

export const VERIFY_OTP = gql`
  mutation verifyOTP($userId: String!, $code: String!) {
    verifyOTP(userId: $userId, code: $code) {
      ...authResultFields
      __typename
    }
  }

  fragment authResultFields on AuthResult {
    idToken
    user {
      ...userFields
      __typename
    }
    __typename
  }

  fragment userFields on User {
    id
    email
    otpEnabled
    __typename
  }
`

export const SignIn: NavigationStackScreenComponent = () => {
  const [, { login }] = useAuth()
  const { bottom, top } = useSafeArea()

  const refPassword = useRef<TextInput>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, signInMutation] = useMutation<
    {
      signIn: IAuthResult
    },
    IMutationSignInArgs
  >(SIGN_IN, {
    async onCompleted({ signIn: { idToken, user } }) {
      if (idToken && user) {
        login({
          email: user.email,
          token: idToken,
          userId: user.id
        })
      } else if (user?.otpEnabled) {
        const code = await dialog.prompt('Code', 'Enter your 2FA code')

        if (code) {
          verifyCode({
            variables: {
              code,
              userId: user.id
            }
          })
        }
      }
    },
    variables: {
      email,
      password
    }
  })

  const [verifyCode, verifyCodeMutation] = useMutation<
    {
      verifyOTP: IAuthResult
    },
    IMutationVerifyOtpArgs
  >(VERIFY_OTP, {
    onCompleted({ verifyOTP: { idToken, user } }) {
      if (idToken && user) {
        login({
          email: user.email,
          token: idToken,
          userId: user.id
        })
      }
    }
  })

  const go = () => {
    if (email && password) {
      signIn()
    }
  }

  const error = signInMutation.error || verifyCodeMutation.error
  const loading = signInMutation.loading || verifyCodeMutation.loading

  return (
    <View
      style={[
        styles.main,
        {
          marginBottom: bottom,
          marginTop: top
        }
      ]}>
      {error && (
        <Message style={styles.message} label={error.message} type="error" />
      )}
      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={email => setEmail(email)}
        onSubmitEditing={() => refPassword.current?.focus()}
        placeholder="Email"
        returnKeyType="next"
        value={email}
      />
      <TextBox
        ref={refPassword}
        style={styles.item}
        autoCorrect={false}
        onChangeText={password => setPassword(password)}
        onSubmitEditing={go}
        placeholder="Password"
        returnKeyType="go"
        secureTextEntry
        value={password}
      />
      <Button
        style={styles.item}
        label="Sign in"
        loading={loading}
        onPress={go}
      />
    </View>
  )
}

SignIn.navigationOptions = {
  header: () => <NavBar back title="Sign in" />
}

const styles = StyleSheet.create({
  item: {
    marginTop: layout.margin
  },
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: layout.margin
  },
  message: {
    marginBottom: layout.margin
  }
})
