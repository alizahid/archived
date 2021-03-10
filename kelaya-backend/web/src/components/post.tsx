import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { Post as PostType } from '../types'

interface Props {
  isList?: boolean
  post: PostType
  showMore?: boolean
}

export const Post: FunctionComponent<Props> = ({
  isList = false,
  post,
  showMore = false
}) => (
  <article className={`my-4 ${isList ? 'border-t border-gray-300 pt-4' : ''}`}>
    <h3 className="text-4xl font-medium leading-none">{post.title}</h3>
    {post.body.split('\n').map((line, index) => (
      <p className="my-4" key={index}>
        {line}
      </p>
    ))}
    <footer className="flex text-sm text-gray-600">
      <span>{post.author.username}</span>
      <span className="ml-4">{moment(post.createdAt).fromNow()}</span>
      {showMore && (
        <span className="ml-4">
          <Link to={`/posts/${post.id}`}>Read more</Link>
        </span>
      )}
    </footer>
  </article>
)
