import React, { FunctionComponent, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Post as PostView } from '../components'
import { usePosts } from '../store'

export const Post: FunctionComponent = () => {
  const { id } = useParams()

  const [{ loading, posts }, { fetchOne }] = usePosts()

  useEffect(() => {
    if (id) {
      fetchOne(id)
    }
  }, [id, fetchOne])

  if (loading) {
    return <main>Loading</main>
  }

  const post = posts.find((post) => post.id === id)

  if (!post) {
    return <main>Not found</main>
  }

  return (
    <main>
      <PostView post={post} />
    </main>
  )
}
