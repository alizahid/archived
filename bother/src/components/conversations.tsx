import React, { FunctionComponent } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { orderBy } from 'lodash'
import moment from 'moment'

import Avatar from './avatar'
import Separator from './separator'

import { IConversation } from '../data'
import { colors, fonts, layout } from '../styles'

interface Props {
  conversations: IConversation[]

  onPress(conversation: IConversation): any
}

const Conversations: FunctionComponent<Props> = ({
  conversations,
  onPress
}) => {
  return (
    <FlatList
      data={orderBy(conversations, 'created', 'desc') as IConversation[]}
      ItemSeparatorComponent={Separator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.main} onPress={() => onPress(item)}>
          <Avatar user={item.users[1]} large />
          <View style={styles.details}>
            <View style={styles.header}>
              <Text style={styles.user}>{item.users[1].name}</Text>
              <Text style={styles.created}>
                {moment(item.created).fromNow()}
              </Text>
            </View>
            <Text style={styles.body}>{item.last.body}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  avatar: {
    borderRadius: layout.border.radius,
    height: layout.icon.avatar,
    width: layout.icon.avatar
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  header: {
    flexDirection: 'row'
  },
  user: {
    ...fonts.regular,
    ...fonts.semibold,
    flex: 1
  },
  created: {
    ...fonts.regular,
    color: colors.textLight,
    marginLeft: layout.padding
  },
  body: {
    ...fonts.regular,
    marginTop: layout.padding
  }
})

export default Conversations
