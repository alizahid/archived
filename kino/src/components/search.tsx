import './search.scss'

import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

const Search: FunctionComponent<RouteComponentProps> = ({
  history,
  location
}) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search.slice(1))

    const query = params.get('query')

    if (query) {
      setQuery(query)
    }
  }, [location.search])

  return (
    <form
      className="search"
      onSubmit={event => {
        event.preventDefault()

        if (query) {
          history.push(`/search?query=${query}`)
        }
      }}
    >
      <input
        type="search"
        placeholder="Search"
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
      />
    </form>
  )
}

export default withRouter(Search)
