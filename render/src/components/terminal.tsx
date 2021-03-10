import Anser from 'anser'
import React, { FunctionComponent } from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

import { fonts } from '../assets'

interface Props {
  style?: StyleProp<TextStyle>
  text: string
}

export const Terminal: FunctionComponent<Props> = ({ style, text }) => {
  const json = Anser.ansiToJson(text.trim())

  return (
    <Text style={style}>
      {json
        .filter(({ content }) => content)
        .map(({ content, fg }, index) => (
          <Text
            key={index}
            style={{
              ...fonts.codeSmall,
              color: `rgb(${fg || '255, 255, 255'})`
            }}>
            {content.replace(/\(B$/, '')}
          </Text>
        ))}
    </Text>
  )
}
