import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { logo } from '../assets'
import { firebase } from '../lib'

import Button from './button'
import Exclusions from './exclusions'

export default class Menu extends Component {
  state = {
    visible: false
  }

  open = () => {
    this.setState({
      visible: true
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { close } = this.props
    const { visible } = this.state

    return (
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modal}>
          {visible && <Exclusions close={this.close} />}
          {!visible && (
            <View style={styles.main}>
              <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.title}>PushBump</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.text}>
                  PushBump bumps your push notifications between your Android
                  and iOS devices.
                </Text>
                <Text style={styles.dismiss}>
                  Tap anywhere to dismiss this dialog.
                </Text>
                <Text style={styles.text}>
                  You can exclude notifications by keywords to help reduce
                  clutter.
                </Text>
                <Button label="Exclude" onPress={this.open} />
                <Text style={styles.text}>
                  You can logout to stop receiving notifications.
                </Text>
                <Button label="Logout" onPress={() => firebase.logout()} />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  main: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 15,
    width: '80%'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  logo: {
    height: 20,
    marginRight: 10,
    width: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  content: {},
  text: {
    lineHeight: 24,
    marginBottom: 10,
    marginTop: 20
  },
  dismiss: {
    fontSize: 12,
    lineHeight: 20
  },
  exclude: {
    marginBottom: 20
  }
})
