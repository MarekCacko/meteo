import React, { useEffect, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'

import Location from '../../containers/Location/Location'
import Weather from '../../containers/Weather/Weather'
import { RootState } from '../../store/store'
import { fetchWeather } from '../../store/weatherSlice'
import { ApiData } from '../../types'
import { cities } from '../../utils/cities'
import { useMediaQuery } from '../../utils/useMedia'
import styles from './App.module.css'

const App = () => {
  const weather = useSelector((state: RootState) => state.weather.cities)
  const [currentCity, setCurrentCity] = useState<ApiData | null>(weather.length > 0 ? weather[0] : null)
  const [isLocationVisible, setLocationVisible] = useState(false)

  const toggle = () => setLocationVisible((s) => !s)

  const changeCity = (city: ApiData) => {
    setCurrentCity(city)
    toggle()
  }

  const dispatch = useDispatch()

  const fetchData = () => {
    /* batch(() => {
      cities.forEach((city) => dispatch(fetchWeather(city)))
    }) */
  }

  useEffect(fetchData, [dispatch])

  useEffect(() => {
    const timer = setInterval(() => fetchData(), 15 * 60 * 1000)
    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    if (weather.length > 0) setCurrentCity(weather[0])
  }, [weather, weather.length])

  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={styles.container}>
      <Weather city={currentCity} openLocation={toggle} />
      <Location changeCity={changeCity} visible={isDesktop || isLocationVisible} />
    </div>
  )
}

export default App
