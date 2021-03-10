import React from 'react'
import { NavigationScreenComponent } from 'react-navigation'

import { Conversations as VConversations, NavBar } from '../components'
import { conversations } from '../data'

const Conversations: NavigationScreenComponent = ({
  navigation: { navigate }
}) => {
  return (
    <VConversations
      conversations={conversations}
      onPress={conversation =>
        navigate('Conversation', {
          conversation
        })
      }
    />
  )
}

Conversations.navigationOptions = {
  header: <NavBar title="Conversations" />
}

export default Conversations
