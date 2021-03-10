import React, { FunctionComponent } from 'react'

import styles from './spinner.module.scss'

interface Props {
  className?: string
}

export const Spinner: FunctionComponent<Props> = ({ className }) => (
  <div className={className}>
    <div className={styles.spinner} />
  </div>
)
