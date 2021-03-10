import React, { FunctionComponent } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useUser } from '../store'

export const Header: FunctionComponent = () => {
  const [{ token }] = useUser()

  return (
    <header className="bg-gray-900 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-white text-2xl font-semibold mx-4">Blog</h1>
      </Link>
      <nav className="flex">
        {token ? (
          <>
            <NavLink
              activeClassName="bg-gray-700"
              className="text-white font-medium p-4 hover:bg-gray-700"
              to="/posts/new"
            >
              Create post
            </NavLink>
            <a
              className="text-white font-medium p-4 hover:bg-gray-700"
              href="/sign-out"
            >
              Sign out
            </a>
          </>
        ) : (
          <>
            <NavLink
              activeClassName="bg-gray-700"
              className="text-white font-medium p-4 hover:bg-gray-700"
              to="/sign-in"
            >
              Sign in
            </NavLink>
            <NavLink
              activeClassName="bg-gray-700"
              className="text-white font-medium p-4 hover:bg-gray-700"
              to="/sign-up"
            >
              Sign up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
