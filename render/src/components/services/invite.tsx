import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { fonts, layout } from '../../assets'
import { Button } from '../button'
import { TextBox } from '../text-box'

interface Props {
  loading?: boolean

  onInvite: (email: string) => void
}

export const ServiceInviteCollaborator: FunctionComponent<Props> = ({
  loading,
  onInvite
}) => {
  const [email, setEmail] = useState('')

  const go = () => {
    if (email) {
      onInvite(email)

      setEmail('')
    }
  }

  return (
    <View style={styles.main}>
      <Text style={styles.message}>Invite someone to join your service.</Text>
      <View style={styles.content}>
        <TextBox
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={email => setEmail(email)}
          onSubmitEditing={go}
          placeholder="Email"
          returnKeyType="go"
          value={email}
        />
        <Button
          style={styles.button}
          label="Invite"
          loading={loading}
          onPress={go}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  content: {
    flexDirection: 'row',
    marginTop: layout.margin
  },
  input: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    flex: 1
  },
  main: {
    padding: layout.margin
  },
  message: {
    ...fonts.regular
  }
})
