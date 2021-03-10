import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, img_render, layout } from '../assets'
import { NavBar } from '../components'
import { link } from '../lib'

export const Help: NavigationStackScreenComponent = () => {
  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.content}>
      <Image style={styles.logo} source={img_render} />
      <Text style={styles.title}>What is Render?</Text>
      <Text style={styles.description}>
        Render is a platform-as-a-service, much like Heroku.
      </Text>
      <Text style={styles.title}>What is this app?</Text>
      <Text style={styles.description}>
        I'm a Render customer and a developer, and since they don't have a
        mobile app yet, I volunteered to build one. It has most of the features
        that the Render web dashboard does.
      </Text>
      <Text style={styles.title}>What tech does this app use?</Text>
      <Text style={styles.description}>
        This app is built with React Native and written in TypeScript. It uses a
        lot of ESLint because I'm anal about formatting and standards. It
        consumes the Render GraphQL API to bring you the data.
      </Text>
      <Text style={styles.title}>Is this app open-source?</Text>
      <Text style={styles.description}>
        Absolutely! Head over to{' '}
        <Text
          style={styles.link}
          onPress={() => link.open('https://github.com/alizahid/render')}>
          GitHub
        </Text>{' '}
        to check it out.
      </Text>
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.description}>
        I'm{' '}
        <Text
          style={styles.link}
          onPress={() => link.open('https://alizahid.dev')}>
          Ali Zahid
        </Text>
        , a tinkerer of code. I build cool stuff.
      </Text>
      <Text style={styles.title}>I found a bug</Text>
      <Text style={styles.description}>
        Head on over to{' '}
        <Text
          style={styles.link}
          onPress={() =>
            link.open('https://github.com/alizahid/render/issues')
          }>
          GitHub
        </Text>{' '}
        and open an issue.
      </Text>
      <Text style={styles.title}>Shout out</Text>
      <Text style={styles.description}>
        Thanks to Anurag and Adrian for all their help with the API integration
        and other things.
      </Text>
    </ScrollView>
  )
}

Help.navigationOptions = {
  header: () => <NavBar back title="Help" />
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: layout.margin
  },
  description: {
    ...fonts.regular,
    marginTop: layout.padding
  },
  link: {
    color: colors.primary
  },
  logo: {
    alignSelf: 'center',
    height: layout.logo.height / 2,
    marginVertical: layout.margin,
    width: layout.logo.width / 2
  },
  main: {
    flex: 1
  },
  title: {
    ...fonts.subtitle,
    marginTop: layout.margin
  }
})
