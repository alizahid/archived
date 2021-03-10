import firebase from 'react-native-firebase'

export default class Firebase {
  static async login(code) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(`${code}@user.pushbump.app`, code)

    return this.subscribe()
  }

  static async logout() {
    await firebase.messaging().unsubscribeFromTopic(`user_${this.user.uid}`)

    return firebase.auth().signOut()
  }

  static async subscribe() {
    await this.getPermissions()

    return firebase.messaging().subscribeToTopic(`user_${this.user.uid}`)
  }

  static async register(code) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(`${code}@user.pushbump.app`, code)

    await firebase
      .firestore()
      .collection('users')
      .add({
        code,
        exclude: '',
        userId: this.user.uid
      })
  }

  static async getPermissions() {
    const enabled = await firebase.messaging().hasPermission()

    if (!enabled) {
      await firebase.messaging().requestPermission()
    }
  }

  static async getUser() {
    if (!this.user) {
      return
    }

    const {
      docs: [user]
    } = await firebase
      .firestore()
      .collection('users')
      .where('userId', '==', this.user.uid)
      .limit(1)
      .get()

    return user.data()
  }

  static async updateUser(data) {
    if (!this.user) {
      return
    }

    const {
      docs: [user]
    } = await firebase
      .firestore()
      .collection('users')
      .where('userId', '==', this.user.uid)
      .limit(1)
      .get()

    return user.ref.update(data)
  }

  static get user() {
    return firebase.auth().currentUser
  }

  static auth() {
    return firebase.auth()
  }

  static firestore() {
    return firebase.firestore()
  }
}
