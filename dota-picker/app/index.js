import React, { Component } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { inject, observer } from 'mobx-react/native'

import { Button, Heroes } from './components'

import star from './assets/star.png'
import sword from './assets/sword.png'

@inject('store')
@observer
export default class DotaPicker extends Component {
  clear = () => {
    const { store } = this.props

    store.clear()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.title}>Dota Picker</Text>
          <Text style={styles.description}>
            Select heroes on either sides, and the app will suggest what you
            should pick to counter
          </Text>
          <View style={styles.legend}>
            <View style={styles.item}>
              <Image style={styles.icon} source={sword} />
              <Text style={styles.label}>Counter</Text>
            </View>
            <View style={styles.item}>
              <Image style={styles.icon} source={star} />
              <Text style={styles.label}>Counters more than one</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.picks}
          contentContainerStyle={styles.main}
          keyboardShouldPersistTaps="always"
        >
          <Heroes side="enemy" />
          <Heroes side="you" />
        </ScrollView>
        <Button label="Clear" onPress={this.clear} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242425',
    flex: 1
  },
  header: {
    padding: 20
  },
  title: {
    color: '#9f3823',
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    color: 'white',
    marginTop: 10
  },
  legend: {
    flexDirection: 'row',
    marginLeft: -15,
    marginTop: 20
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 15
  },
  icon: {
    height: 20,
    width: 20
  },
  label: {
    color: 'white',
    marginLeft: 5
  },
  picks: {
    backgroundColor: '#444'
  },
  main: {
    flex: 1,
    flexDirection: 'row'
  }
})
