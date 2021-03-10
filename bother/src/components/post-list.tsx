import React, { FunctionComponent } from 'react'
import { QueryHookResult } from 'react-apollo-hooks'
import { get } from 'lodash'

import Posts from './posts'

interface Props {
  result: QueryHookResult<any, any>
  type: string
}

const PostList: FunctionComponent<Props> = ({ result, type }) => {
  const { data, error, loading, refetch } = result

  return (
    <Posts
      error={error}
      posts={get(data, `posts.${type}`, [])}
      loading={loading}
      refetch={refetch}
    />
  )
}

export default PostList
