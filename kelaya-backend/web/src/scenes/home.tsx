import React, { FunctionComponent, useEffect } from 'react'

import { Post } from '../components'
import { usePosts } from '../store'

export const Home: FunctionComponent = () => {
  const [{ loading, posts }, { fetchAll }] = usePosts()

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  if (loading) {
    return <main>Loading</main>
  }

  return (
    <main>
      <h2>Posts</h2>
      {posts.map((post, index) => (
        <Post isList key={index} post={post} showMore />
      ))}
    </main>
  )
}
