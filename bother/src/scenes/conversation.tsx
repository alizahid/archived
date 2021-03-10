import React from 'react'
import { NavigationScreenComponent, HeaderProps } from 'react-navigation'

import {
  Conversation as VConversation,
  ConversationHeader
} from '../components'
import { Conversation as IConversation } from '../data'

interface Props {
  conversation: IConversation
}

const Conversation: NavigationScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const conversation = getParam('conversation')

  return <VConversation conversation={conversation} />
}

Conversation.navigationOptions = {
  header: ConversationHeader
}

export default Conversation
