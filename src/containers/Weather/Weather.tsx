import React, { useEffect, useState } from 'react'

import ImageHeader from '../../components/ImageHeader/ImageHeader'
import { ApiData } from '../../types'
import styles from './Weather.module.css'

interface Props {
  openLocation: () => void
  city: ApiData | null
}

const Weather = (props: Props) => {
  const { city, openLocation } = props

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <main>
      <ImageHeader />
      <section className={styles.weatherInfoContainer}>
        <div className={styles.infoPanel}>
          <div className={styles.dateTime}>
            {date.toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' })} |{' '}
            {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, hourCycle: 'h11' })}
          </div>
          <div role="link" tabIndex={0} onClick={openLocation} onKeyDown={openLocation} className={styles.locationLink}>
            {city?.name}, Slovakia
          </div>
        </div>
        <div className={styles.cityInfo}>grid</div>
      </section>
    </main>
  )
}

export default Weather
