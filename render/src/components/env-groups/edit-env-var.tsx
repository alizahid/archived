import React, { FunctionComponent, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { fonts, layout, weights } from '../../assets'
import { IEnvVar } from '../../graphql/types'
import { Button } from '../button'
import { Switch } from '../switch'
import { TextBox } from '../text-box'

interface Props {
  envVar?: IEnvVar
  hideFileSwitch?: boolean
  loading?: boolean

  onSave: (key: string, value: string, isFile: boolean) => void
}

export const EditEnvVar: FunctionComponent<Props> = ({
  envVar,
  hideFileSwitch,
  loading,
  onSave
}) => {
  const refValue = useRef<TextInput>(null)

  const [key, setKey] = useState(envVar?.key || '')
  const [value, setValue] = useState(envVar?.value || '')
  const [isFile, setIsFile] = useState(false)

  const go = () => {
    if (key && value) {
      onSave(key, value.trim(), envVar ? envVar.isFile : isFile)
    }
  }

  return (
    <View style={styles.main}>
      <Text style={styles.label}>Key</Text>
      <TextBox
        style={styles.key}
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
        style={styles.value}
        autoCapitalize="none"
        autoCorrect={false}
        multiline
        onChangeText={value => setValue(value)}
        onSubmitEditing={go}
        placeholder="Value"
        returnKeyType="go"
        value={value}
      />
      {!envVar && !hideFileSwitch && (
        <View style={styles.isFile}>
          <Text style={styles.isFileLabel}>Is this a secret file?</Text>
          <Switch onChange={isFile => setIsFile(isFile)} value={isFile} />
        </View>
      )}
      <Button label="Save" loading={loading} onPress={go} />
    </View>
  )
}

const styles = StyleSheet.create({
  isFile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: layout.margin
  },
  isFileLabel: {
    ...fonts.regular,
    flex: 1
  },
  key: {
    ...fonts.code,
    marginBottom: layout.margin,
    marginTop: layout.padding
  },
  label: {
    ...fonts.regular,
    ...weights.medium
  },
  main: {
    flex: 1,
    padding: layout.margin
  },
  value: {
    ...fonts.code,
    flex: 1,
    marginBottom: layout.margin,
    marginTop: layout.padding,
    paddingBottom: layout.margin,
    paddingTop: layout.margin * (3 / 4)
  }
})
