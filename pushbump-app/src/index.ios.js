import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import moment from 'moment'

import { collapse, expand, nothing, remove } from './assets'
import { Header, Login } from './components'
import { codePush, dialog, firebase, util } from './lib'

class PushBump extends Component {
  state = {
    collapsed: new Map(),
    loading: false,
    notifications: [],
    ready: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      this.setState({
        loading: true,
        ready: !!user
      })

      if (user) {
        this.unsubscribe = firebase
          .firestore()
          .collection('notifications')
          .where('userId', '==', user.uid)
          .orderBy('time', 'desc')
          .onSnapshot(snapshot =>
            this.setState({
              notifications: util.groupNotifications(snapshot)
            })
          )

        await firebase.subscribe()
      } else {
        this.componentWillUnmount()
      }

      this.setState({
        loading: false
      })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()

      this.unsubscribe = null
    }
  }

  onBarcode = async ({ data }) => {
    const { loading } = this.state

    if (loading) {
      return
    }

    this.setState({
      loading: true
    })

    try {
      await firebase.login(data)
    } catch (err) {
      const { message } = err

      dialog.alert(message)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  toggle = app => {
    const { collapsed } = this.state

    if (collapsed.get(app)) {
      collapsed.delete(app)
    } else {
      collapsed.set(app, true)
    }

    this.setState({
      collapsed
    })
  }

  removeByApp = async app => {
    const { docs } = await firebase
      .firestore()
      .collection('notifications')
      .where('userId', '==', firebase.user.uid)
      .where('app', '==', app)
      .get()

    await Promise.all(docs.map(({ ref }) => ref.delete()))
  }

  removeById = async id => {
    const notification = await firebase
      .firestore()
      .collection('notifications')
      .doc(id)

    await notification.delete()
  }

  renderEmpty = () => {
    const { loading } = this.state

    if (loading) {
      return (
        <View style={styles.empty}>
          <ActivityIndicator color="#000" />
        </View>
      )
    }

    return (
      <View style={styles.empty}>
        <Image style={styles.nothing} source={nothing} />
        <Text style={styles.noNotifications}>No notifications</Text>
      </View>
    )
  }

  renderSectionHeader = ({ section: { data, icon, title } }) => {
    const { collapsed } = this.state

    return (
      <View style={styles.section}>
        {icon && (
          <Image
            style={styles.icon}
            source={{
              uri: `data:image/png;base64,${icon}`
            }}
          />
        )}
        <TouchableOpacity
          style={styles.touch}
          onPress={() => this.toggle(title)}
        >
          <Text style={styles.app}>
            {title} <Text style={styles.count}>{data.length}</Text>
          </Text>
          <Image
            style={styles.expand}
            source={collapsed.get(title) ? expand : collapse}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.removeByApp(title)}>
          <Image style={styles.remove} source={remove} />
        </TouchableOpacity>
      </View>
    )
  }

  renderItem = ({ item: { id, app, body, time, title } }) => {
    const { collapsed } = this.state

    if (collapsed.get(app)) {
      return null
    }

    return (
      <TouchableOpacity style={styles.item} onPress={() => this.removeById(id)}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{moment(time).fromNow(true)}</Text>
        </View>
        <Text style={styles.body}>{body}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { loading, notifications, ready } = this.state

    if (!ready) {
      return <Login loading={loading} onBarcode={this.onBarcode} />
    }

    const total = notifications.reduce(
      (total, { data }) => (total += data.length),
      0
    )

    return (
      <SafeAreaView style={styles.main}>
        <StatusBar barStyle="dark-content" />
        <Header notifications={total} />
        <SectionList
          style={styles.list}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id}
          ListEmptyComponent={this.renderEmpty}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={notifications}
        />
        {total > 0 && (
          <Text style={styles.footer}>Tap a notification to dismiss it.</Text>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  list: {
    flexGrow: 1
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  nothing: {
    height: 50,
    width: 50
  },
  noNotifications: {
    marginTop: 20
  },
  section: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  icon: {
    height: 32,
    width: 32
  },
  touch: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20
  },
  app: {
    fontSize: 18,
    fontWeight: '500'
  },
  count: {
    color: '#666',
    fontWeight: 'normal'
  },
  expand: {
    height: 20,
    marginLeft: 10,
    opacity: 0.5,
    width: 20
  },
  remove: {
    height: 20,
    margin: 10,
    opacity: 0.25,
    width: 20
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  header: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    fontWeight: '500'
  },
  body: {
    marginTop: 10
  },
  time: {
    color: '#999',
    marginLeft: 10
  },
  footer: {
    color: '#999',
    marginTop: 20,
    textAlign: 'center'
  }
})

export default codePush(PushBump)
