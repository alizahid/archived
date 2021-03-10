import React, { Component } from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { info } from '../assets'

import Menu from './menu'

export default class Header extends Component {
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
    const { notifications } = this.props
    const { visible } = this.state

    return (
      <View style={styles.main}>
        <Text style={styles.title}>
          {notifications > 0
            ? `${notifications} notifications`
            : 'Notifications'}
        </Text>
        <TouchableOpacity onPress={this.open}>
          <Image style={styles.icon} source={info} />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          onRequestClose={this.close}
          transparent
          visible={visible}
        >
          <Menu close={this.close} />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: '500'
  },
  icon: {
    height: 20,
    margin: 10,
    width: 20
  }
})
