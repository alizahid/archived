import React, { FunctionComponent } from 'react'
import { Switch as RNSwitch } from 'react-native'

import { colors } from '../assets'

interface Props {
  value: boolean

  onChange: (value: boolean) => void
}

export const Switch: FunctionComponent<Props> = ({ onChange, value }) => {
  return (
    <RNSwitch
      trackColor={{
        false: colors.backgroundDark,
        true: colors.primary
      }}
      onValueChange={value => onChange(value)}
      thumbColor={colors.background}
      value={value}
    />
  )
}
