import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, NavigationScreenComponent } from 'react-navigation'
import { get } from 'lodash'

import { IConversation } from '../data'
import { colors, fonts, layout, shadow } from '../styles'

import Avatar from './avatar'

const ConversationHeader: NavigationScreenComponent = ({ navigation }) => {
  const conversation: IConversation = get(
    navigation,
    'state.routes.1.params.conversation'
  )

  if (!conversation) {
    return null
  }

  const { users } = conversation

  const [sender, receiver] = users

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <Avatar user={receiver} />
        <Text style={styles.name}>{receiver.name}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    ...shadow,
    backgroundColor: colors.background
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  name: {
    ...fonts.semibold,
    marginLeft: layout.margin
  }
})

export default ConversationHeader
