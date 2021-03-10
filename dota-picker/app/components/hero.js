import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Avatar, Picker } from './'

export default class Hero extends Component {
  state = {
    pickerVisible: false
  }

  togglePicker = () => {
    const { pickerVisible } = this.state

    this.setState({
      pickerVisible: !pickerVisible
    })
  }

  pickHero = hero => {
    const { onPick } = this.props

    onPick(hero)
  }

  render() {
    const { hero, index, side } = this.props
    const { pickerVisible } = this.state

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={this.togglePicker}>
          {hero && <Avatar {...hero} size="large" />}
        </TouchableOpacity>
        {pickerVisible && (
          <Picker onPick={this.pickHero} onClose={this.togglePicker} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 56,
    marginVertical: 10,
    width: 100
  }
})
