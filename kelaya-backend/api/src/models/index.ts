const { DATABASE_URI } = process.env

import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(DATABASE_URI)

import { Post } from './post'
import { User } from './user'

User.hasMany(Post, {
  as: 'posts',
  foreignKey: {
    name: 'authorId'
  }
})

Post.belongsTo(User, {
  as: 'author',
  foreignKey: {
    name: 'authorId'
  }
})

export { Post, User }
