import { MarkGithubIcon } from '@primer/octicons-react'
import React, { FunctionComponent } from 'react'

import styles from './header.module.scss'
import { Search } from './search'

interface Props {
  full?: boolean
}

export const Header: FunctionComponent<Props> = ({ full = false }) => {
  return (
    <div
      className={styles.header}
      style={{
        marginBottom: full ? 'auto' : '2em',
        marginTop: full ? 'auto' : '2em'
      }}>
      <header>
        <MarkGithubIcon size={50} />
        <div>
          <h1>GitHub Searcher</h1>
          <p>Search users or repositories below</p>
        </div>
      </header>
      <Search />
    </div>
  )
}
