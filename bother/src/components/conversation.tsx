import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { orderBy } from 'lodash'
import moment from 'moment'

import { IConversation, IMessage } from '../data'
import { colors, fonts, layout } from '../styles'

import Reply from './reply'

interface Props {
  conversation: IConversation
}

const Conversation: FunctionComponent<Props> = ({
  conversation: { messages, users }
}) => {
  const [sender] = users

  return (
    <>
      <FlatList
        contentContainerStyle={styles.content}
        data={orderBy(messages, 'created', 'desc') as IMessage[]}
        inverted
        keyboardShouldPersistTaps="handled"
        keyExtractor={({ id }) => id}
        ListFooterComponent={() => (
          <View style={styles.warning}>
            <Text style={styles.message}>
              Remember to be kind and considerate.
              {'\n'}
              Don't be offensive or hateful.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={[styles.main, item.user === sender && styles.mine]}>
            <Text style={[styles.body, item.user !== sender && styles.theirs]}>
              {item.body}
              <Text style={styles.time}>
                {moment(item.created).format(' HH:mm')}
              </Text>
            </Text>
          </View>
        )}
      />
      <Reply onReply={() => {}} />
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingTop: layout.padding
  },
  warning: {
    backgroundColor: colors.blue,
    padding: layout.padding,
    marginBottom: layout.padding
  },
  message: {
    ...fonts.regular,
    color: colors.background,
    textAlign: 'center'
  },
  main: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: layout.border.radius,
    marginHorizontal: layout.margin,
    marginVertical: layout.padding,
    maxWidth: '70%',
    padding: layout.padding
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: colors.backgroundDark
  },
  body: {
    ...fonts.regular
  },
  theirs: {
    color: colors.background
  },
  time: {
    ...fonts.small,
    opacity: 0.5
  }
})

export default Conversation
