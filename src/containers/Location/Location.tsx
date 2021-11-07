import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'
import { ApiData } from '../../types'
import { useDebounce } from '../../utils/useDebounce'
import styles from './Location.module.css'

interface Props {
  changeCity: (city: ApiData) => void
}

const Location = (props: Props) => {
  const weather = useSelector((state: RootState) => state.weather.cities)

  const [filter, setFilter] = useState('')

  const debouncedFilter = useDebounce(filter, 200)

  const { changeCity } = props

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
      <div className={styles.cities} role="menu">
        {weather
          .filter((city) => city.name.toLowerCase().includes(debouncedFilter.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((city) => {
            return (
              <div
                key={city.id}
                className={styles.city}
                onKeyDown={() => changeCity(city)}
                onClick={() => changeCity(city)}
                role="menuitem"
                tabIndex={0}
              >
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
