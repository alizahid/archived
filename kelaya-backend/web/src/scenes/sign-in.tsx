import React, { FunctionComponent, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { useUser } from '../store'

export const SignIn: FunctionComponent = () => {
  const [{ signInError, signInLoading, token }, { signIn }] = useUser()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (token) {
    return <Redirect to="/" />
  }

  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          if (username && password) {
            signIn(username, password)
          }
        }}
      >
        <h2>Sign in</h2>
        {signInError && (
          <div className="my-4 p-4 bg-red-500 text-white rounded">
            {signInError}
          </div>
        )}
        <label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            type="text"
            value={username}
          />
        </label>
        <label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </label>
        <button disabled={signInLoading}>
          {signInLoading ? 'Loading' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
