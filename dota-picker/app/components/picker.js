import React, { Component } from 'react'
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Avatar, Button, TextBox } from './'

import heroes from '../data/heroes.json'

const blank = {
  id: null,
  name: 'Clear'
}

export default class Picker extends Component {
  state = {
    data: [blank, ...heroes]
  }

  filterHeroes = query => {
    const data = heroes.filter(({ name }) => {
      const regex = new RegExp(query, 'i')

      return regex.test(name)
    })

    data.unshift(blank)

    this.setState({
      data
    })
  }

  pickHero(hero) {
    const { onClose, onPick } = this.props

    onPick(hero)

    onClose()
  }

  renderItem(hero) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.pickHero(hero)}
      >
        <Avatar id={hero.id} size="small" />
        <Text style={styles.name}>{hero.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { onClose } = this.props
    const { data } = this.state

    return (
      <Modal animationType="slide" transparent={true} onRequestClose={onClose}>
        <SafeAreaView style={styles.modal}>
          <TextBox placeholder="Search" onChangeText={this.filterHeroes} />
          <FlatList
            data={data}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => this.renderItem(item)}
          />
          <Button label="Close" onPress={onClose} />
        </SafeAreaView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    flex: 1
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 15
  },
  name: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15
  }
})
