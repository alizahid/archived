import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import { firebase } from '../lib'

import Button from './button'

export default class Exclusions extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    const { exclude } = await firebase.getUser()

    this.setState({
      exclude: exclude.split('|').join('\n'),
      loading: false
    })
  }

  save = async () => {
    const { close } = this.props
    const { exclude } = this.state

    this.setState({
      loading: true
    })

    await firebase.updateUser({
      exclude: exclude
        .split('\n')
        .filter(Boolean)
        .join('|')
    })

    close()
  }

  render() {
    const { exclude, loading } = this.state

    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Exclusions</Text>
        </View>
        <View style={styles.content}>
          {loading && !exclude && (
            <View style={styles.loading}>
              <ActivityIndicator color="#000" />
            </View>
          )}
          <TextInput
            style={styles.input}
            multiline
            placeholder={loading ? 'Loading…' : 'WhatsApp\nGoogle'}
            value={exclude}
            onChangeText={exclude =>
              this.setState({
                exclude
              })
            }
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Save"
            onPress={this.save}
            loading={loading && exclude}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 15,
    width: '100%'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  content: {
    marginVertical: 20
  },
  loading: {
    marginBottom: 20
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 5,
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  exclude: {
    marginBottom: 20
  }
})
