import React, { FunctionComponent, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { PostList } from '../components'
import { Post } from '../lib/types'
import PostEdit from './post-edit'
import PostNew from './post-new'

const Container = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const Posts: FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(process.env.REACT_APP_URI + '/posts?all')

      const { posts } = await response.json()

      setPosts(posts)
    })()
  }, [])

  return (
    <Container>
      <PostList posts={posts} />
      <Switch>
        <Route path="/posts/new" exact component={PostNew} />
        <Route path="/posts/:slug" component={PostEdit} />
      </Switch>
    </Container>
  )
}

export default Posts
