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
      <header>Location</header>
      <div>
        <input
          type="text"
          placeholder="Search city..."
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {weather
          .filter((city) => city.name.toLowerCase().includes(debouncedFilter))
          .map((city) => {
            return (
              <div key={city.id}>
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
