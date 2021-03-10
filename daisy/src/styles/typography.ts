import { layout } from './layout'

export const sans = {
  medium: {
    fontFamily: 'Inter_500Medium'
  },
  regular: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16
  },
  small: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12
  },
  subtitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20
  },
  tiny: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24
  }
}

export const lineHeight = (fontSize: number): number =>
  fontSize * layout.lineHeight
