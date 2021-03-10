import React, { Component } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { moviemate } from '../assets'
import { AutoComplete, Button, Footer } from '../components'

export default class Home extends Component {
  state = {}

  match = () => {
    const { one, two } = this.state

    if (one && two && one.id !== two.id) {
      Actions.matches({
        one,
        two
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior="padding">
        <Image style={styles.logo} source={moviemate} />
        <AutoComplete
          style={styles.one}
          placeholder="Brad Pitt"
          onSelect={one =>
            this.setState({
              one
            })
          }
        />
        <AutoComplete
          style={styles.two}
          placeholder="George Clooney"
          onSelect={two =>
            this.setState({
              two
            })
          }
        />
        <Button style={styles.button} label="Find" onPress={this.match} />
        <Footer />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  logo: {
    alignSelf: 'center',
    height: 100,
    marginBottom: 40,
    width: 100
  },
  one: {
    // android craziness
    zIndex: Platform.select({
      ios: 2
    })
  },
  two: {
    marginTop: 10,
    // android craziness
    zIndex: Platform.select({
      ios: 1
    })
  },
  button: {
    marginTop: 20
  }
})
