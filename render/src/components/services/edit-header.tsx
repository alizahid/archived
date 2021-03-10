import React, { FunctionComponent, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native'

import { fonts, layout, weights } from '../../assets'
import { IHeader } from '../../graphql/types'
import { Button } from '../button'
import { TextBox } from '../text-box'

interface Props {
  header?: IHeader
  loading?: boolean

  onSave: (path: string, key: string, value: string) => void
}

export const EditHeader: FunctionComponent<Props> = ({
  header,
  loading,
  onSave
}) => {
  const refKey = useRef<TextInput>(null)
  const refValue = useRef<TextInput>(null)

  const [path, setPath] = useState(header?.path || '')
  const [key, setKey] = useState(header?.key || '')
  const [value, setValue] = useState(header?.value || '')

  const go = () => {
    if (path && key && value) {
      onSave(path, key, value)
    }
  }

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="always">
      <Text style={styles.label}>Path</Text>
      <TextBox
        style={styles.textBox}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={path => setPath(path)}
        onSubmitEditing={() => refKey.current?.focus()}
        placeholder="Path"
        returnKeyType="next"
        value={path}
      />
      <Text style={styles.label}>Key</Text>
      <TextBox
        ref={refKey}
        style={styles.textBox}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={key => setKey(key)}
        onSubmitEditing={() => refValue.current?.focus()}
        placeholder="Key"
        returnKeyType="next"
        value={key}
      />
      <Text style={styles.label}>Value</Text>
      <TextBox
        ref={refValue}
        style={styles.textBox}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={value => setValue(value)}
        onSubmitEditing={go}
        placeholder="Value"
        returnKeyType="go"
        value={value}
      />
      <Button label="Save" loading={loading} onPress={go} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: layout.margin
  },
  label: {
    ...fonts.regular,
    ...weights.medium
  },
  main: {
    flex: 1
  },
  textBox: {
    ...fonts.code,
    marginBottom: layout.margin,
    marginTop: layout.padding
  }
})
