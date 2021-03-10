import React, { FunctionComponent, useRef } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { gray_clear } from '../assets'
import { colors, layout } from '../styles'

interface Props {
  autoCorrect?: boolean
  autoFocus?: boolean
  clearButton?: boolean
  multiline?: boolean
  placeholder?: string
  style?: any
  value?: string

  onChangeText?(query: string): any
}

const { height } = Dimensions.get('window')

const TextBox: FunctionComponent<Props> = ({
  autoCorrect,
  autoFocus,
  clearButton,
  multiline,
  placeholder,
  style,
  value,
  onChangeText
}) => {
  const ref = useRef<TextInput>(null)

  return (
    <View style={[styles.main, multiline && styles.multi, style]}>
      <TextInput
        ref={ref}
        style={[styles.input, multiline && styles.multiline]}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        value={value}
      />
      {clearButton && !multiline && (
        <TouchableOpacity
          style={styles.clear}
          onPress={() => {
            if (ref.current) {
              ref.current.clear()
            }

            if (onChangeText) {
              onChangeText('')
            }
          }}
        >
          <Image style={styles.icon} source={gray_clear} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    flexDirection: 'row'
  },
  multi: {
    paddingVertical: layout.margin * (3 / 4)
  },
  input: {
    height: layout.textBox.size,
    flex: 1,
    paddingHorizontal: layout.margin
  },
  multiline: {
    height: height / 5
  },
  clear: {
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

export default TextBox
