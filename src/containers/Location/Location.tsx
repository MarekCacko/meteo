import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'
import styles from './Location.module.css'

const Location = () => {
  const weather = useSelector((state: RootState) => state.weather.cities)

  return (
    <section className={styles.locationContainer}>
      <header>Location</header>
      <div>
        <input type="text" placeholder="Search city..." />
      </div>
      <div>
        {Object.keys(weather).map((objectKey) => {
          const city = weather[objectKey]
          return (
            <div>
              <div>{city.name}</div>
              <div>{Math.round(city.main.temp)}°C</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Location
