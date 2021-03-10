import { API_URI, TMDB_IMAGE_URI } from 'react-native-dotenv'

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import debounce from 'lodash.debounce'

import { avatar } from '../assets'

import TextBox from './textbox'
import Touchable from './touchable'

export default class AutoComplete extends Component {
  state = {}

  componentDidMount() {
    this.search = debounce(async value => {
      const response = await fetch(`${API_URI}/search?query=${value}`)

      const { results } = await response.json()

      this.setState({
        loading: false,
        results
      })
    }, 300)
  }

  onChangeText = value => {
    if (value.length > 2) {
      this.setState({
        value,
        open: true,
        loading: true
      })

      this.search(value)
    } else {
      this.setState({
        value,
        open: false,
        loading: true,
        results: null
      })
    }
  }

  onFocus = () => {
    const { loading, results } = this.state

    if (!loading && results) {
      this.setState({
        open: true
      })
    }
  }

  onBlur = () => {
    this.setState({
      open: false
    })
  }

  select = item => {
    const { onSelect } = this.props

    onSelect(item)

    const { name } = item

    this.setState({
      open: false,
      results: null,
      value: name
    })

    Keyboard.dismiss()
  }

  renderItem = item => {
    const { id, image, name } = item

    const Photo = (() => {
      if (image) {
        return (
          <Image
            style={styles.image}
            source={{
              uri: `${TMDB_IMAGE_URI}/h632/${image}`
            }}
          />
        )
      }

      return (
        <View style={styles.image}>
          <Image style={styles.empty} source={avatar} />
        </View>
      )
    })()

    return (
      <Touchable key={id} onPress={() => this.select(item)}>
        <View style={styles.item}>
          {Photo}
          <Text style={styles.label}>{name}</Text>
        </View>
      </Touchable>
    )
  }

  render() {
    const { placeholder, style } = this.props
    const { loading, open, results, value } = this.state

    return (
      <View style={style}>
        <TextBox
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          placeholder={placeholder}
          value={value}
        />
        {open && (
          <View style={styles.main}>
            <View style={styles.triangle} />
            <ScrollView
              style={styles.content}
              keyboardShouldPersistTaps="always"
            >
              {loading && (
                <ActivityIndicator style={styles.spinner} color="#fff" />
              )}
              {!loading && results && results.map(this.renderItem)}
              {!loading && results && results.length === 0 && (
                <Text style={styles.notFound}>Nothing found</Text>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 42,
    width: '100%',
    zIndex: 1
  },
  triangle: {
    borderBottomColor: '#e80c30',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderWidth: 10,
    height: 0,
    left: '50%',
    marginLeft: -10,
    marginTop: 1,
    overflow: 'hidden',
    width: 0
  },
  content: {
    backgroundColor: '#e80c30',
    borderRadius: 4,
    maxHeight: 200
  },
  spinner: {
    margin: 20
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  },
  image: {
    alignItems: 'center',
    backgroundColor: '#fd902b',
    borderRadius: 2,
    height: 60,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: 45
  },
  empty: {
    height: 30,
    width: 30
  },
  label: {
    color: '#fff',
    marginLeft: 10
  },
  notFound: {
    color: '#fff',
    margin: 20,
    textAlign: 'center'
  }
})
