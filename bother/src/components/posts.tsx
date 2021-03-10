import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { IPost } from '../data'

import Error from './error'
import Post from './post'
import Separator from './separator'

interface Props {
  error: any
  posts: IPost[]
  loading: boolean

  refetch: any
}

const Posts: FunctionComponent<Props> = ({
  error,
  posts,
  loading,
  refetch
}) => {
  if (error) {
    return <Error />
  }

  return (
    <FlatList
      data={posts}
      ItemSeparatorComponent={Separator}
      keyboardShouldPersistTaps="handled"
      keyExtractor={({ id }) => id}
      onRefresh={refetch}
      refreshing={loading}
      renderItem={({ item }) => <Post post={item} />}
    />
  )
}

export default Posts
