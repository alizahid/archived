import React, { Component } from 'react'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { Colors, Layout } from '../styles'

export default class BlackModal extends Component {
  render() {
    const { children, close, visible } = this.props

    return (
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={close}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.modal}>
            <View style={styles.container}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.modal,
    justifyContent: 'center'
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    marginHorizontal: Layout.margin * 2,
    maxHeight: '80%'
  }
})
