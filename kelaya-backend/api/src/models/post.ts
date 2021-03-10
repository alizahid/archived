import { DataTypes, Model, UUIDV4 } from 'sequelize'

import { sequelize } from '.'
import { User } from './user'

export class Post extends Model {
  id!: string

  title!: string
  body!: string

  authorId!: string
  author?: User

  readonly createdAt!: Date
  readonly updatedAt!: Date

  toJSON(): Post {
    const values = {
      ...this.get()
    } as Post

    if (values.author) {
      values.author = {
        username: values.author.username
      } as User
    }

    delete values.authorId

    return values
  }
}

Post.init(
  {
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    id: {
      defaultValue: UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'Post',
    sequelize,
    tableName: 'posts'
  }
)
