import React, { FunctionComponent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

import { Modal } from '../components'

const Header = styled.h1`
  font-size: 2em;
  margin: 0;
  padding: 1em 1em 0;
`

const Form = styled.form`
  padding: 1em 2em;
`

const Auth: FunctionComponent<RouteComponentProps> = ({
  history: { replace }
}) => {
  const [key, setKey] = useState()

  if (localStorage.getItem('@key')) {
    return <Redirect to="/posts" />
  }

  return (
    <Modal>
      <Header>Auth</Header>
      <Form
        onSubmit={event => {
          event.preventDefault()

          if (key) {
            localStorage.setItem('@key', key)

            replace('/posts')
          }
        }}>
        <label>
          <input
            onChange={event => setKey(event.target.value)}
            placeholder="Key"
            type="password"
          />
        </label>
        <p>
          <button>Save</button>
        </p>
      </Form>
    </Modal>
  )
}

export default Auth
