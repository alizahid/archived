import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

import { TextBox } from './'
import { Layout } from '../styles'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.onChangeText = debounce(query => this._onChangeText(query), 300, {
      leading: true
    })
  }

  _onChangeText(query) {
    const { onQuery } = this.props

    onQuery(query)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextBox
          autoCapitalize="none"
          autoCorrect={false}
          clearButton={true}
          onChangeText={this.onChangeText}
          placeholder="Search"
        />
      </View>
    )
  }
}

const top = Expo.Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    top,
    padding: Layout.margin,
    position: 'absolute',
    width: '100%'
  }
})
