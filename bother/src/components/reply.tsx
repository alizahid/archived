import React, { FunctionComponent, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { black_send } from '../assets'
import { colors, layout } from '../styles'

import TextBox from './text-box'

interface Props {
  loading?: boolean

  onReply(reply: string): any
}

const Reply: FunctionComponent<Props> = ({ loading, onReply }) => {
  const [reply, setReply] = useState('')

  return (
    <View style={styles.main}>
      <TextBox
        style={styles.input}
        onChangeText={reply => setReply(reply)}
        placeholder="Say something nice"
        value={reply}
      />
      {loading && (
        <ActivityIndicator
          style={styles.send}
          color={colors.primary}
          size="small"
        />
      )}
      {!loading && (
        <TouchableOpacity
          style={styles.send}
          onPress={() => {
            if (!reply) {
              return
            }

            onReply(reply)

            setReply('')
          }}
        >
          <Image style={styles.icon} source={black_send} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 0,
    flex: 1
  },
  send: {
    alignItems: 'center',
    height: layout.textBox.size,
    justifyContent: 'center',
    width: layout.textBox.size
  },
  icon: {
    height: layout.icon.small,
    width: layout.icon.small
  }
})

export default Reply
