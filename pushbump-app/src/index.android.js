import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppState,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import shortid from 'shortid'

import { logo } from './assets'
import { Button } from './components'
import { codePush, firebase, pushbump } from './lib'

class PushBump extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onActive)

    firebase.auth().onAuthStateChanged(async user => {
      console.log('foo', JSON.stringify(user))

      if (user) {
        const { code } = await firebase.getUser()

        this.setState({
          code
        })
      } else {
        const code = shortid.generate()

        await firebase.register(code)

        this.setState({
          code
        })
      }
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onActive)
  }

  onActive = state => {
    if (state === 'active') {
      this.readyCheck()
    }
  }

  async readyCheck() {
    const ready = await pushbump.hasAccess()

    this.setState({
      ready
    })
  }

  render() {
    const { code, ready } = this.state

    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="#111" barStyle="light-content" />
        <View style={styles.header}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.title}>PushBump</Text>
        </View>
        {!ready && (
          <View style={styles.container}>
            <Text style={styles.message}>
              Please allow PushBump access to your notifications.
            </Text>
            <Button label="Allow" onPress={pushbump.requestAccess} />
          </View>
        )}
        {ready && !code && (
          <View style={styles.container}>
            <ActivityIndicator color="#000" />
          </View>
        )}
        {ready && code && (
          <View style={styles.container}>
            <Text style={styles.message}>
              Scan this on the PushBump iOS app.
            </Text>
            <QRCode size={200} value={code} />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  logo: {
    height: 30,
    width: 30
  },
  title: {
    color: '#000',
    fontSize: 30,
    marginLeft: 20
  },
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  message: {
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  }
})

export default codePush(PushBump)
