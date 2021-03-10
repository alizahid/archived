import React, { Component } from 'react'
import { Image, FlatList, StyleSheet, View } from 'react-native'
import debounce from 'lodash.debounce'

import { Modal, Text, TextBox, Touchable } from './'
import { Colors, Layout } from '../styles'

import check from '../assets/check.png'
import expand from '../assets/expand_arrow.png'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)

    const { data } = props

    this.state = {
      data,
      show: false
    }

    this.onChangeText = debounce(query => this._onChangeText(query), 300, {
      leading: true
    })
  }

  toggle = (show = !this.state.show) => {
    this.setState({
      show: !!show
    })
  }

  getItem = value => {
    const { data } = this.props

    return data.find(item => item.value === value)
  }

  setValue = value => {
    this.setState({
      value
    })

    const { setSelection } = this.props

    if (setSelection) {
      const selected = setSelection(value)

      if (selected) {
        this.toggle()

        this.onChangeText('')
      }
    }
  }

  _onChangeText(query) {
    const { data } = this.props

    this.setState({
      data: data.filter(
        item => item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0
      )
    })
  }

  renderItem(item) {
    const { value } = this.props

    const current = value === item.value

    return (
      <Touchable style={styles.item} onPress={() => this.setValue(item.value)}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        {current && <Image style={styles.check} source={check} />}
      </Touchable>
    )
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  renderEmpty() {
    return <Text style={styles.empty}>Nothing found</Text>
  }

  render() {
    let { data, show } = this.state
    const { style, label, value } = this.props

    const current = this.getItem(value)

    return (
      <View style={[styles.container, style]}>
        <Touchable style={styles.header} onPress={this.toggle}>
          <View style={styles.headerContent}>
            <Text style={styles.label}>{label}</Text>
            <Text>{current.label}</Text>
          </View>
          <Image
            style={[styles.expand, show && styles.expanded]}
            source={expand}
          />
        </Touchable>
        <Modal visible={show} close={() => this.toggle(false)}>
          <TextBox
            style={styles.search}
            autoCapitalize="none"
            autoCorrect={false}
            clearButton={true}
            onChangeText={this.onChangeText}
            placeholder="Search"
          />
          <View style={styles.separator} />
          <FlatList
            data={data}
            ItemSeparatorComponent={this.renderSeparator}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.value}
            ListEmptyComponent={this.renderEmpty}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderLight,
    borderRadius: Layout.radius,
    borderWidth: 1
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.padding
  },
  headerContent: {
    flex: 1
  },
  label: {
    fontWeight: '600',
    marginBottom: Layout.padding
  },
  expand: {
    height: 20,
    opacity: 0.5,
    width: 20
  },
  expanded: {
    transform: [
      {
        rotate: '180deg'
      }
    ]
  },
  search: {
    elevation: 0,
    shadowOpacity: 0
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.padding
  },
  itemLabel: {
    flex: 1
  },
  check: {
    height: 20,
    width: 20
  },
  separator: {
    backgroundColor: Colors.borderLight,
    height: 1
  },
  empty: {
    margin: Layout.padding
  }
})
