import React, { FunctionComponent, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput } from 'react-native'

import { colors, fonts, img_dark_expand, layout, weights } from '../../assets'
import { IRedirectRule } from '../../graphql/types'
import { dialog } from '../../lib'
import { Button } from '../button'
import { TextBox } from '../text-box'
import { Touchable } from '../touchable'

interface Props {
  rule?: IRedirectRule
  loading?: boolean

  onSave: (source: string, destination: string, status: number) => void
}

export const EditRedirect: FunctionComponent<Props> = ({
  loading,
  onSave,
  rule
}) => {
  const refDestination = useRef<TextInput>(null)

  const [source, setSource] = useState(rule?.source || '')
  const [destination, setDestination] = useState(rule?.destination || '')
  const [status, setStatus] = useState(301)

  const go = () => {
    if (source && destination) {
      onSave(source, destination, status)
    }
  }

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="always">
      <Text style={styles.label}>Source</Text>
      <TextBox
        style={styles.source}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={source => setSource(source)}
        onSubmitEditing={() => refDestination.current?.focus()}
        placeholder="Source"
        returnKeyType="next"
        value={source}
      />
      <Text style={styles.label}>Destination</Text>
      <TextBox
        ref={refDestination}
        style={styles.destination}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={destination => setDestination(destination)}
        onSubmitEditing={go}
        placeholder="Destination"
        returnKeyType="go"
        value={destination}
      />
      <Text style={styles.label}>Type</Text>
      <Touchable
        style={styles.type}
        onPress={async () => {
          const index = await dialog.options(
            'Rule type',
            'Is this a redirect or a rewrite rule?',
            ['Redirect', 'Rewrite']
          )

          if (index === 0) {
            setStatus(301)
          } else {
            setStatus(200)
          }
        }}>
        <Text style={styles.typeLabel}>
          {status === 301 ? 'Redirect' : 'Rewrite'}
        </Text>
        <Image style={styles.icon} source={img_dark_expand} />
      </Touchable>
      <Button label="Save" loading={loading} onPress={go} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: layout.margin
  },
  destination: {
    ...fonts.code,
    marginBottom: layout.margin,
    marginTop: layout.padding
  },
  icon: {
    ...layout.icon,
    marginHorizontal: layout.margin * (3 / 4)
  },
  label: {
    ...fonts.regular,
    ...weights.medium
  },
  main: {
    flex: 1
  },
  source: {
    ...fonts.code,
    marginBottom: layout.margin,
    marginTop: layout.padding
  },
  type: {
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    flexDirection: 'row',
    marginBottom: layout.margin,
    marginTop: layout.padding
  },
  typeLabel: {
    ...fonts.regular,
    flex: 1,
    margin: layout.margin * (3 / 4)
  }
})
