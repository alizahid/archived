import { Alert } from 'react-native'

class Dialog {
  alert(title: string, message: string) {
    Alert.alert(title, message)
  }

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise(resolve =>
      Alert.alert(title, message, [
        {
          onPress: () => resolve(false),
          style: 'cancel',
          text: 'No'
        },
        {
          onPress: () => resolve(true),
          style: 'destructive',
          text: 'Yes'
        }
      ])
    )
  }

  prompt(title: string, message: string): Promise<string | undefined> {
    return new Promise(resolve =>
      Alert.prompt(title, message, [
        {
          style: 'destructive',
          text: 'Cancel'
        },
        {
          onPress: value => resolve(value),
          text: 'Okay'
        }
      ])
    )
  }

  options(title: string, message: string, options: string[]): Promise<number> {
    return new Promise(resolve =>
      Alert.alert(title, message, [
        ...options.map((option, index) => ({
          onPress: () => resolve(index),
          text: option
        })),
        {
          style: 'cancel',
          text: 'Cancel'
        }
      ])
    )
  }

  notAvailable(title: string) {
    this.alert(title, 'This feature is not available right now.')
  }
}

export const dialog = new Dialog()
