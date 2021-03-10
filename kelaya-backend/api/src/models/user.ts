import { DataTypes, Model, UUIDV4 } from 'sequelize'

import { sequelize } from '.'
import { Post } from './post'

export class User extends Model {
  id!: string

  username!: string
  password!: string

  posts?: Post[]

  readonly createdAt!: Date
  readonly updatedAt!: Date

  toJSON(): User {
    const values = {
      ...this.get()
    } as User

    delete values.password

    return values
  }
}

User.init(
  {
    id: {
      defaultValue: UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    modelName: 'User',
    sequelize,
    tableName: 'users'
  }
)
