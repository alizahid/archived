import { Linking } from 'react-native'

class Link {
  open(link: string) {
    Linking.openURL(link)
  }
}

export const link = new Link()
