import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import { Main } from './'
import { Colors } from '../styles'

export default class Spinner extends Component {
  render() {
    return (
      <Main style={styles.spinner}>
        <ActivityIndicator color={Colors.primary} />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    justifyContent: 'center'
  }
})
