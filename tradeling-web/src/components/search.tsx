import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

import { SearchParams, SearchType } from '../types'
import styles from './search.module.scss'

export const Search: FunctionComponent = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const params = useParams<SearchParams>()

  const [text, setText] = useState(params.query ?? '')
  const [type, setType] = useState<SearchType>(params.type ?? 'users')

  const [query] = useDebounce(text, 500)

  useEffect(() => {
    if (query.length >= 3 && pathname !== `/search/${type}/${query}`) {
      history.push(`/search/${type}/${query}`)
    } else if (query.length < 3 && pathname !== '/') {
      history.push('/')
    }
  }, [query, type, params, pathname, history])

  return (
    <form
      className={styles.search}
      onSubmit={(event) => {
        event.preventDefault()
      }}>
      <input
        onChange={(event) => setText(event.target.value)}
        placeholder="Start typing to search"
        type="search"
        value={text}
      />
      <select
        onChange={(event) => setType(event.target.value as SearchType)}
        value={type}>
        <option value="users">Users</option>
        <option value="repositories">Repositories</option>
      </select>
    </form>
  )
}
