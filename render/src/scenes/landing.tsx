import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, img_render, layout } from '../assets'
import { Button } from '../components'

export const Landing: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const { bottom, top } = useSafeArea()

  return (
    <View
      style={[
        styles.main,
        {
          marginBottom: bottom,
          marginTop: top
        }
      ]}>
      <View style={styles.content}>
        <Image style={styles.logo} source={img_render} />
        <Text style={styles.title}>render</Text>
        <Text style={styles.desription}>this is a third party app</Text>
      </View>
      <View style={styles.footer}>
        <Button label="Sign in" onPress={() => navigate('SignIn')} />
      </View>
    </View>
  )
}

Landing.navigationOptions = {
  header: () => null
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  desription: {
    ...fonts.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  },
  footer: {
    margin: layout.margin
  },
  logo: {
    ...layout.logo
  },
  main: {
    flex: 1
  },
  title: {
    ...fonts.title,
    marginTop: layout.margin
  }
})
