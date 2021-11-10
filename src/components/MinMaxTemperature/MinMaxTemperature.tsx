import React from 'react'

import styles from './MinMaxTemperature.module.css'

interface Props {
  min: number
  max: number
}

const MinMaxTemperature = (props: Props) => {
  const { min, max } = props

  return (
    <div className={styles.minMaxTemperature}>
      <span className={styles.temperature}>
        {max}°C<span className={styles.arrow}>↑</span>
      </span>
      <span className={styles.temperature}>
        {min}°C<span className={styles.arrow}>↓</span>
      </span>
    </div>
  )
}

export default MinMaxTemperature
