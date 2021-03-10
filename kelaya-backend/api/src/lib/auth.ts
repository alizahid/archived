const { TOKEN_SECRET } = process.env

import { compare, hash } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

import { User } from '../models'
import { CreatePostRequestHeaders } from '../types'
import { Exception } from './exception'

class Auth {
  createToken(user: User): string {
    return sign(user.id, TOKEN_SECRET)
  }

  verifyToken(token: string): string {
    return verify(token, TOKEN_SECRET) as string
  }

  signPassword(password: string): Promise<string> {
    return hash(password, 10)
  }

  comparePassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password)
  }

  getUserId(headers: CreatePostRequestHeaders): string {
    const token = headers['x-token']

    if (!token) {
      throw new Exception('Missing auth token', 400)
    }

    const userId = this.verifyToken(token)

    if (!userId) {
      throw new Exception('Invalid token', 401)
    }

    return userId
  }
}

export const auth = new Auth()
