import React from 'react'

import styles from './CurrentWeather.module.css'

interface Props {
  weather: string
  icon: string
}

const CurrentWeather = (props: Props) => {
  const { icon, weather } = props

  return (
    <div className={styles.currentWeather}>
      <img className={styles.icon} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="ada" />
      <span>{weather}</span>
    </div>
  )
}

export default CurrentWeather
