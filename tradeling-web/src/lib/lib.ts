import { Repository, User } from '../types'

export const isUser = (item: Repository | User): item is User =>
  (item as User).login !== undefined
