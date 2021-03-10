import React, { FunctionComponent, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useUser } from '../store'

export const SignOut: FunctionComponent = () => {
  const [, { signOut }] = useUser()

  useEffect(() => {
    signOut()
  }, [signOut])

  return <Redirect to="/" />
}
