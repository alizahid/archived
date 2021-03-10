import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { usePosts } from '../store'

export const PostNew: FunctionComponent = () => {
  const { push } = useHistory()

  const [{ createError, createLoading }, { create }] = usePosts()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          if (title && body) {
            create(title, body, (id) => push(`/posts/${id}`))
          }
        }}
      >
        <h2>New post</h2>
        {createError && (
          <div className="my-4 p-4 bg-red-500 text-white rounded">
            {createError}
          </div>
        )}
        <label>
          <input
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
            type="text"
            value={title}
          />
        </label>
        <label>
          <textarea
            onChange={(event) => setBody(event.target.value)}
            placeholder="Content"
            required
            value={body}
          />
        </label>
        <button disabled={createLoading}>
          {createLoading ? 'Loading' : 'Save'}
        </button>
      </form>
    </main>
  )
}
