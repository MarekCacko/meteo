import React from 'react'

import styles from './CurrentTemperature.module.css'

interface Props {
  temperature: number
}

const CurrentTemperature = (props: Props) => {
  const { temperature } = props

  return (
    <div className={styles.currentTemperature}>
      <span className={styles.temperature}>
        {temperature}
        <span className={styles.units}>°C</span>
      </span>
    </div>
  )
}

export default CurrentTemperature
