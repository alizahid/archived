import { auth, Exception } from '../lib'
import { User } from '../models'
import { AuthResult, SignInRequestBody, SignUpRequestBody } from '../types'

export class UserService {
  static async signUp(body: SignUpRequestBody): Promise<AuthResult> {
    if (!body) {
      throw new Exception('Invalid request', 400)
    }

    const { password, username } = body

    if (!password || !username) {
      throw new Exception('Invalid request', 400)
    }

    const user = await User.create({
      password: await auth.signPassword(password),
      username
    })

    const token = auth.createToken(user)

    return {
      token,
      user
    }
  }

  static async signIn(body: SignInRequestBody): Promise<AuthResult> {
    if (!body) {
      throw new Exception('Invalid request', 400)
    }

    const { password, username } = body

    if (!password || !username) {
      throw new Exception('Invalid request', 400)
    }

    const user = await User.findOne({
      where: {
        username
      }
    })

    if (!user) {
      throw new Exception('User not found', 404)
    }

    if (!(await auth.comparePassword(user, password))) {
      throw new Exception('Invalid password', 400)
    }

    const token = auth.createToken(user)

    return {
      token,
      user
    }
  }
}
