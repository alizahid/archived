import React from 'react'
import { NavigationScreenComponent } from 'react-navigation'

import { Post as VPost, Comments, Error, Spinner } from '../components'
import { IPost } from '../data'

interface Props {
  post: IPost
}

const Post: NavigationScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const post = getParam('post')

  return (
    <>
      <VPost post={post} unlink />
      <Comments post={post} />
    </>
  )
}

Post.navigationOptions = {
  header: null
}

export default Post
