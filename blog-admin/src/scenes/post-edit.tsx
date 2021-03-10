import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { PostForm } from '../components'
import { Post } from '../lib/types'

interface Props {
  slug: string
}

const PostEdit: FunctionComponent<RouteComponentProps<Props>> = ({
  history: { push },
  match: {
    params: { slug }
  }
}) => {
  const [post, setPost] = useState<Post>()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        process.env.REACT_APP_URI + `/post?slug=${slug}`
      )

      const { post } = await response.json()

      setPost(post)
    })()
  }, [slug])

  return <PostForm onRemove={() => push('/posts')} post={post} />
}

export default PostEdit
