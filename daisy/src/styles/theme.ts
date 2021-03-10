import { Theme } from '@react-navigation/native'

import { colors } from './colors'

export const theme: Theme = {
  colors: {
    background: colors.background,
    border: colors.border,
    card: colors.background,
    notification: colors.primary,
    primary: colors.primary,
    text: colors.foreground
  },
  dark: false
}
