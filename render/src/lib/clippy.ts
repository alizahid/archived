import { Clipboard } from 'react-native'

class Clippy {
  copy(data: string) {
    Clipboard.setString(data)
  }
}

export const clippy = new Clippy()
