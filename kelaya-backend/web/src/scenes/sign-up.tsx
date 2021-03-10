import React, { FunctionComponent, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { useUser } from '../store'

export const SignUp: FunctionComponent = () => {
  const [{ signUpError, signUpLoading, token }, { signUp }] = useUser()

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
            signUp(username, password)
          }
        }}
      >
        <h2>Sign up</h2>
        {signUpError && (
          <div className="my-4 p-4 bg-red-500 text-white rounded">
            {signUpError}
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
        <button disabled={signUpLoading}>
          {signUpLoading ? 'Loading' : 'Sign up'}
        </button>
      </form>
    </main>
  )
}
