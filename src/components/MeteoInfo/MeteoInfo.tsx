import classNames from 'classnames'
import React from 'react'

import styles from './MeteoInfo.module.css'

interface Props {
  icon: string
  value: string
  description: string
  shadow?: boolean
}

const MeteoInfo = (props: Props) => {
  const { icon, value, description, shadow } = props

  return (
    <div className={classNames(styles.info, shadow ? styles.shadow : '')}>
      <img className={styles.icon} src={icon} alt={description} />
      <span className={styles.value}>{value}</span>
      <span className={styles.description}>{description}</span>
    </div>
  )
}

MeteoInfo.defaultProps = {
  shadow: false,
}

export default MeteoInfo
