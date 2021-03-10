import { Theme } from '@react-navigation/native'
import { StackNavigationOptions } from '@react-navigation/stack'

import { Themes } from '../types'

export const colors = {
  background: '#fff',
  borderDark: '#27272a',
  borderLight: '#e4e4e7',
  foreground: '#000',
  modal: 'rgba(20, 20, 20, 0.8)',
  primary: '#009245'
}

export const layout = {
  button: 40,
  icon: 20,
  margin: 20,
  padding: 10,
  radius: 5,
  textBox: 50
}

export const rtl = {
  image: {
    transform: [
      {
        scaleX: -1
      }
    ]
  }
}

export const typefaces = {
  inter: {
    medium: 'Inter-Medium',
    regular: 'Inter-Regular'
  },
  poppins: {
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold'
  }
}

export const typography = {
  regular: {
    fontFamily: typefaces.inter.regular,
    fontSize: 16,
    lineHeight: 24
  },
  small: {
    fontFamily: typefaces.inter.regular,
    fontSize: 14,
    lineHeight: 20
  },
  subtitle: {
    fontFamily: typefaces.poppins.medium,
    fontSize: 18,
    lineHeight: 28
  },
  title: {
    fontFamily: typefaces.poppins.semibold,
    fontSize: 20,
    lineHeight: 28
  }
}

export const headerTitleStyle: StackNavigationOptions['headerTitleStyle'] = {
  fontFamily: typefaces.inter.medium,
  fontWeight: '500'
}

export const themes: {
  [key in Themes]: Theme
} = {
  custom: {
    colors: {
      background: '#d1fae5',
      border: '#a7f3d0',
      card: '#d1fae5',
      notification: '#047857',
      primary: '#047857',
      text: colors.foreground
    },
    dark: false
  },
  dark: {
    colors: {
      background: colors.foreground,
      border: colors.borderDark,
      card: colors.foreground,
      notification: colors.primary,
      primary: colors.primary,
      text: colors.background
    },
    dark: true
  },
  light: {
    colors: {
      background: colors.background,
      border: colors.borderLight,
      card: colors.background,
      notification: colors.primary,
      primary: colors.primary,
      text: colors.foreground
    },
    dark: false
  }
}
