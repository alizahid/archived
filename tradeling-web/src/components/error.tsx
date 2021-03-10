import React, { FunctionComponent } from 'react'

import styles from './error.module.scss'

interface Props {
  error: string
}

export const Error: FunctionComponent<Props> = ({ error }) => (
  <div className={styles.error}>
    <h3>Error</h3>
    <p>{error}</p>
  </div>
)
