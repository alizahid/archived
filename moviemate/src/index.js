import { CODEPUSH_KEY_IOS, CODEPUSH_KEY_ANDROID } from 'react-native-dotenv'

import React, { Component } from 'react'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'
import { Router, Scene, Stack } from 'react-native-router-flux'
import codePush from 'react-native-code-push'

import { Home, Matches } from './scenes'

class MovieMate extends Component {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <Router>
          <Stack key="root" hideNavBar>
            <Scene key="home" component={Home} />
            <Scene key="matches" component={Matches} />
          </Stack>
        </Router>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

const options = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  deploymentKey: Platform.select({
    android: CODEPUSH_KEY_ANDROID,
    ios: CODEPUSH_KEY_IOS
  })
}

export default codePush(options)(MovieMate)
