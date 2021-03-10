import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { PostForm } from '../components'

const PostNew: FunctionComponent<RouteComponentProps> = ({
  history: { push }
}) => <PostForm onNew={slug => push(`/posts/${slug}`)} />

export default PostNew
