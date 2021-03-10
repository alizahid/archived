import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Error, Header, RepositoryCard, Spinner, UserCard } from '../components'
import { isUser } from '../lib'
import { AppDispatch, RootState } from '../store'
import { go } from '../store/search'
import { SearchParams } from '../types'
import styles from './results.module.scss'

export const Results: FunctionComponent = () => {
  const { query, type } = useParams<SearchParams>()

  const { error, loading, results } = useSelector(
    (state: RootState) => state.search
  )

  const dispatch = useDispatch<AppDispatch>()

  const key = `${type}:${query}`

  const data = results[key]

  useEffect(() => {
    if (query && type && !data) {
      dispatch(go(query, type))
    }
  }, [query, type, data, dispatch])

  return (
    <>
      <Header />
      <main className={styles.results}>
        {loading ? (
          <Spinner className={styles.spinner} />
        ) : error ? (
          <Error error={error} />
        ) : (
          <div className={styles.items}>
            {(data ?? []).map((item) =>
              isUser(item) ? (
                <UserCard key={item.login} user={item} />
              ) : (
                <RepositoryCard key={item.name} repository={item} />
              )
            )}
          </div>
        )}
      </main>
    </>
  )
}
