import { auth, Exception } from '../lib'
import { Post, User } from '../models'
import {
  CreatePostRequestBody,
  CreatePostRequestHeaders,
  GetAllPostsRequestQuery,
  GetPostRequestParams
} from '../types'

export class PostService {
  static getAll({
    limit = 10,
    offset = 0
  }: GetAllPostsRequestQuery): Promise<Post[]> {
    return Post.findAll({
      include: [
        {
          as: 'author',
          model: User
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })
  }

  static async getById({ id }: GetPostRequestParams): Promise<Post> {
    const post = await Post.findByPk(id, {
      include: [
        {
          as: 'author',
          model: User
        }
      ]
    })

    if (!post) {
      throw new Exception('Post not found', 400)
    }

    return post
  }

  static async create(
    headers: CreatePostRequestHeaders,
    data: CreatePostRequestBody
  ): Promise<Post> {
    const authorId = auth.getUserId(headers)

    const post = await Post.create({
      authorId,
      ...data
    })

    return post
  }
}
