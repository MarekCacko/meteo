import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'
import { useDebounce } from '../../utils/useDebounce'
import styles from './Location.module.css'

const Location = () => {
  const weather = useSelector((state: RootState) => state.weather.cities)

  const [filter, setFilter] = useState('')

  const debouncedFilter = useDebounce(filter, 200)

  return (
    <section className={styles.locationContainer}>
      <header className={styles.header}>Location</header>
      <div className={styles.filter}>
        <input
          type="text"
          placeholder="Search city ..."
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className={styles.cities}>
        {weather
          .filter((city) => city.name.toLowerCase().includes(debouncedFilter))
          .map((city) => {
            return (
              <div key={city.id} className={styles.city}>
                <div className={styles.name}>{city.name}</div>
                <div className={styles.temperature}>{Math.round(city.main.temp)}°C</div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default Location
