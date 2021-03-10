import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { RNCamera } from 'react-native-camera'

import { logo } from '../assets'

export default class Login extends Component {
  render() {
    const { loading, onBarcode } = this.props

    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.title}>PushBump</Text>
          </View>
          {!loading && (
            <Text style={styles.message}>
              Scan the QR code from the PushBump Android app.
            </Text>
          )}
          {loading && (
            <View style={styles.container}>
              <ActivityIndicator color="#000" />
            </View>
          )}
        </View>
        {!loading && (
          <View style={styles.container}>
            <RNCamera style={styles.camera} onBarCodeRead={onBarcode} />
          </View>
        )}
      </View>
    )
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
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
    fontSize: 30,
    marginLeft: 20,
    textAlign: 'center'
  },
  message: {
    color: '#333',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  camera: {
    borderRadius: 10,
    height: width * 0.6,
    overflow: 'hidden',
    width: width * 0.6
  }
})
