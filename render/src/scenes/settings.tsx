import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import md5 from 'md5'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, img_dark_help, layout } from '../assets'
import { Button, NavBar, Spinner } from '../components'
import { IQueryUserArgs, IUser } from '../graphql/types'
import { dialog } from '../lib'
import { useAuth } from '../store'

export const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      ...userFields
      __typename
    }
  }

  fragment userFields on User {
    email
    name
    __typename
  }
`

export const Settings: NavigationStackScreenComponent = () => {
  const [{ email, loading: loggingOut }, { logout }] = useAuth()

  const { data, loading } = useQuery<
    {
      user: IUser
    },
    IQueryUserArgs
  >(GET_USER, {
    variables: {
      email: email as string
    }
  })

  return (
    <View style={styles.main}>
      {loading && <Spinner />}
      {data?.user && (
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={{
              uri: `https://www.gravatar.com/avatar/${md5(
                data.user.email
              )}?d=mm&r=x&s=200`
            }}
          />
          <Text style={styles.title}>{data.user.name}</Text>
          <Text style={styles.email}>{data.user.email}</Text>
        </View>
      )}
      <Button
        style={styles.signOut}
        styleLabel={styles.signOutLabel}
        label="Sign out"
        loading={loggingOut}
        onPress={async () => {
          const yes = await dialog.confirm(
            'Sign out',
            'Are you sure you want to sign out?'
          )

          if (yes) {
            logout()
          }
        }}
      />
    </View>
  )
}

Settings.navigationOptions = ({ navigation: { navigate } }) => ({
  header: () => (
    <NavBar
      action={{
        icon: img_dark_help,
        onPress: () => navigate('Help')
      }}
      title="Settings"
    />
  )
})

const styles = StyleSheet.create({
  avatar: {
    ...layout.logo,
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.logo.height
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  email: {
    ...fonts.regular,
    color: colors.foregroundLight
  },
  main: {
    flex: 1
  },
  signOut: {
    backgroundColor: colors.background,
    borderColor: colors.state.error,
    borderWidth: layout.border.width * 2,
    margin: layout.margin
  },
  signOutLabel: {
    color: colors.state.error
  },
  title: {
    ...fonts.title,
    marginBottom: layout.padding,
    marginTop: layout.margin
  }
})
