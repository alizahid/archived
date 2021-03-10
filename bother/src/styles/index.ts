import { iOSColors, systemWeights } from 'react-native-typography'

export const colors = {
  ...iOSColors,
  background: iOSColors.white,
  backgroundDark: iOSColors.customGray,
  border: iOSColors.customGray,
  borderDark: iOSColors.lightGray,
  primary: iOSColors.pink,
  text: iOSColors.black,
  textLight: iOSColors.gray
}

export const fonts = {
  bold: {
    ...systemWeights.bold
  },
  regular: {
    fontSize: 14,
    lineHeight: 20
  },
  semibold: {
    ...systemWeights.semibold
  },
  small: {
    fontSize: 12,
    lineHeight: 16
  },
  title: {
    ...systemWeights.semibold,
    fontSize: 24
  }
}

export const layout = {
  margin: 20,
  padding: 10,
  border: {
    radius: 4,
    size: 1
  },
  button: {
    size: 50
  },
  icon: {
    avatar: 40,
    hero: 100,
    large: 25,
    small: 20
  },
  textBox: {
    size: 50
  }
}

export const shadow = {
  shadowColor: iOSColors.gray,
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowOpacity: 0.25,
  shadowRadius: 5
}
